/**
 * these events will be catched by users
 */
export enum IBuildInEvent {
  UPLOAD_PROGRESS = "uploadProgress",
  FAILED = "failed",
  BEFORE_TRANSFORM = "beforeTransform",
  BEFORE_UPLOAD = "beforeUpload",
  AFTER_UPLOAD = "afterUpload",
  FINISHED = "finished",
  INSTALL = "install",
  UNINSTALL = "uninstall",
  UPDATE = "update",
  NOTIFICATION = "notification",
}
