import React from "react";
import cls from "classnames";
import { useControllableValue } from "ahooks";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  isRight?: boolean;
}

interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  footer?: React.ReactNode;
  footerClassName?: string;
  border?: boolean;
  pill?: boolean;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { items, footer, footerClassName, border, pill } = props;
  const [value, setValue] = useControllableValue<string>(props, {
    defaultValue: items[0].key,
  });

  const renderContent = () => (
    <>
      <div className="card-header">
        <div
          className={cls("nav", {
            "nav-tabs card-header-tabs": !pill,
            "nav-pills card-header-pills": pill,
          })}
        >
          {items.map((item) => (
            <div
              key={item.key}
              className={cls("nav-item", { "ms-auto": item.isRight })}
              onClick={() => setValue(item.key)}
            >
              <a className={cls("nav-link", { active: value === item.key })}>
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className="tab-content">
          {items.map((item) => (
            <div
              key={item.key}
              className={cls("tab-pane", { "active show": value === item.key })}
            >
              {item.children}
            </div>
          ))}
        </div>
      </div>
      {footer && (
        <div className={cls("card-footer", footerClassName)}>{footer}</div>
      )}
    </>
  );

  if (!border) return renderContent();

  return <div className="card">{renderContent()}</div>;
};

export default Tabs;
