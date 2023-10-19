import React from "react";
import ModalWrapper from "..";
import { IModal } from "@/context/modal/types";
import { FiX } from "react-icons/fi";

const ConfirmTransactionModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data: url } = props;
  return (
    <ModalWrapper
      bodyStyle={{
        className: "bg-white flex-grow relative rounded",
        style: { maxWidth: "720px" },
      }}
      showModal={showModal}
      onClose={onClose}
      allowOnClickOutside
    >
      <div className="min-h-[500px] flex relative">
        <FiX className=" absolute top-7 right-8" role="button" onClick={() => onClose()} />
        <iframe src={url} className=" flex-grow"></iframe>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmTransactionModal;
