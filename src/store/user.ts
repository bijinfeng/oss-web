import { create } from "zustand";

export interface UserInfo {
  _id: string;
  email: string;
  avatar: string;
}

interface UserState {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useBearStore = create<UserState>((set) => {
  return {
    setUserInfo: (userInfo) => set({ userInfo }),
  };
});

export default useBearStore;
