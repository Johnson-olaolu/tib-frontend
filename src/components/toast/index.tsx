import React from "react";
import ToastBadge from "./ToastBadge";
import { IToastData } from "@/context/toast/types";

const Toast: React.FC<{
  closeToast: (id: string) => void;
  data: IToastData[];
}> = (props) => {
  const { closeToast, data } = props;
  return (
    <aside className=" fixed z-[100] top-10 right-10 flex flex-col gap-4">
      {data.map((toastData) => (
        <ToastBadge key={toastData.id} data={toastData} closeToast={closeToast} />
      ))}
    </aside>
  );
};

export default Toast;
