export enum Platform {
  windows = "win32",
  macos = "darwin",
  linux = "linux",
}

export enum Direction {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

export enum Layout {
  grid,
  table,
}

export enum Page {
  bucket,
  transferList,
  transferDone,
  setting,
  services,
}

export enum KeyCode {
  Escape = "Escape",
}

export type Color =
  | "blue"
  | "azure"
  | "indigo"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "cyan";
