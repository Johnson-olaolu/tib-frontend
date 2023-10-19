import React from "react";
import ModalWrapper from "..";
import { IModal } from "@/context/modal/types";

const ConfirmTransactionModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data: url } = props;
  return (
    <ModalWrapper
      bodyStyle={{
        className: "bg-white flex-grow relative rounded-xl",
        style: { maxWidth: "720px" },
      }}
      showModal={showModal}
      onClose={onClose}
    >
      <div className="">
        <iframe src={url} width="400" height="200"></iframe>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmTransactionModal;
