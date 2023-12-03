import React, { createContext, useContext, useMemo, useState } from "react";
import { IModalContext, ModalTypes } from "./types";
import ConfirmTransactionModal from "@/components/modal/extra/ConfirmTransactionModal";
import VaultCreateIdeaModal from "@/components/modal/vault-create-idea";

const ModalContext = createContext({});

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ModalTypes>();
  const [data, setData] = useState<any>();
  const openModal = (type: ModalTypes, payload?: any) => {
    setShowModal(true);
    setActiveModal(type);
    setData(payload);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveModal(undefined);
    setData(undefined);
  };

  const getModal = () => {
    switch (activeModal) {
      case "confirm-transaction":
        return <ConfirmTransactionModal onClose={closeModal} showModal={showModal} data={data} />;
      case "vault-create-idea":
        return <VaultCreateIdeaModal onClose={closeModal} showModal={showModal} data={data} />;
      default:
        return null;
    }
  };

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      getModal,
    }),
    [getModal, data]
  );
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

const useModal = (): IModalContext => useContext(ModalContext) as IModalContext;

export default useModal;
