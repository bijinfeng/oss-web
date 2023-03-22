import { create } from "zustand";
import type { UserInfo } from "@/interface";
import { getUserInfo } from "@/request";

interface UserState {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserStore = create<UserState>((set) => {
  getUserInfo()
    .then((res) => {
      if (res.code === 0) {
        set({ userInfo: res.data });
      }
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    setUserInfo: (userInfo) => set({ userInfo }),
  };
});

export default useUserStore;
