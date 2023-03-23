import { create } from "zustand";
import type { UserInfo } from "@/interface";
import { getUserInfo } from "@/request";

enum LoginStatus {
  NOT_LOGGED_IN,
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_FAILED,
}

interface UserState {
  userInfo?: UserInfo;
  status: LoginStatus;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserStore = create<UserState>((set) => {
  if (window.__LOGIN__) {
    getUserInfo()
      .then((res) => {
        if (res.code === 0) {
          set({ userInfo: res.data, status: LoginStatus.LOGGED_IN });
        }
        return res;
      })
      .catch((error) => {
        set({ status: LoginStatus.LOGIN_FAILED });
        console.log(error);
      });
  }

  return {
    status: window.__LOGIN__
      ? LoginStatus.LOGGING_IN
      : LoginStatus.NOT_LOGGED_IN,
    setUserInfo: (userInfo) => set({ userInfo }),
  };
});

export default useUserStore;
