import React, { useImperativeHandle } from "react";
import { render } from "rc-util/lib/React/render";
import { useNotification, NotificationAPI } from "rc-notification";
import type { CSSMotionProps } from "rc-motion";
import Alert, { AlertProps } from "@/components/Alert";
import "./index.less";

const motion: CSSMotionProps = {
  motionName: "rc-notification-fade",
  motionAppear: true,
  motionEnter: true,
  motionLeave: true,
  onLeaveStart: (ele) => {
    const { offsetHeight } = ele;
    return { height: offsetHeight };
  },
  onLeaveActive: () => ({ height: 0, opacity: 0, margin: 0 }),
};

let act: (callback: VoidFunction) => Promise<void> | void = (
  callback: VoidFunction
) => callback();

interface HolderRef {
  instance: Omit<NotificationAPI, "open"> & {
    open: (options: NotificationConfig) => void;
  };
}

interface NotificationConfig extends AlertProps {
  key?: string;
}

const Holder = React.forwardRef<HolderRef>((_, ref) => {
  const [api, holder] = useNotification({
    maxCount: 3,
    motion,
  });

  const open = (config: NotificationConfig) => {
    return api.open({
      content: <Alert style={{ minWidth: 384 }} {...config} />,
    });
  };

  useImperativeHandle(ref, () => ({ instance: { ...api, open } }));

  return holder;
});

let globalNotification: GlobalNotification | null = null;

interface GlobalNotification {
  fragment: DocumentFragment;
  instance?: HolderRef["instance"] | null;
  sync?: VoidFunction;
}

type Task =
  | {
      type: "open";
      config: NotificationConfig;
    }
  | {
      type: "destroy";
      key: React.Key;
    };

let taskQueue: Task[] = [];

const flushNotice = () => {
  if (!globalNotification) {
    const holderFragment = document.createDocumentFragment();
    const newNotification: GlobalNotification = {
      fragment: holderFragment,
    };

    globalNotification = newNotification;

    const setRef = (ref: HolderRef) => {
      // eslint-disable-next-line promise/catch-or-return, promise/prefer-await-to-then
      Promise.resolve().then(() => {
        // eslint-disable-next-line promise/always-return
        if (!newNotification.instance && ref.instance) {
          newNotification.instance = ref.instance;
          flushNotice();
        }
      });
    };

    act(() => {
      render(<Holder ref={setRef} />, holderFragment);
    });
  }

  if (!globalNotification.instance) return;

  // >>> Execute task
  taskQueue.forEach((task) => {
    // eslint-disable-next-line default-case
    switch (task.type) {
      case "open": {
        act(() => {
          globalNotification!.instance!.open({
            ...task.config,
          });
        });
        break;
      }

      case "destroy":
        act(() => {
          globalNotification?.instance!.close(task.key);
        });
        break;
    }
  });

  // Clean up
  taskQueue = [];
};

function open(config: NotificationConfig) {
  taskQueue.push({
    type: "open",
    config,
  });
  flushNotice();
}

function destroy(key: React.Key) {
  taskQueue.push({
    type: "destroy",
    key,
  });
  flushNotice();
}

export const notification = {
  open,
  destroy,
  success: (config: NotificationConfig) => open({ ...config, type: "success" }),
  error: (config: NotificationConfig) => open({ ...config, type: "error" }),
  info: (config: NotificationConfig) => open({ ...config, type: "info" }),
  warning: (config: NotificationConfig) => open({ ...config, type: "warning" }),
};

export default notification;
