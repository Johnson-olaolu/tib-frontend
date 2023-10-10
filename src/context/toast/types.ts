export type notificationTypes = "success" | "failure" | "info";

export interface IToastContext {
  getToast: () => JSX.Element;
  openToast: (data: IToastPayload) => void;
}

export interface IToastData {
  id: string;
  type: notificationTypes;
  text: string;
  title?: string;
}

export interface IToastPayload {
  type: notificationTypes;
  text: string;
  title?: string;
}
