export interface UserInfo {
  _id: string;
  email: string;
  avatar?: string;
}

export interface FileInfo {
  _id: string;
  owner: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  name: string;
  banner: string;
  total: number;
}
