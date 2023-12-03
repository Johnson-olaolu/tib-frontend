export type ModalTypes = "confirm-transaction" | "vault-create-idea";

export interface IModalContext {
  openModal: (type: ModalTypes, payload?: any) => void;
  closeModal: () => void;
  getModal: () => JSX.Element;
}

export interface IModal<D> {
  onClose: () => void;
  showModal: boolean;
  data?: D;
}
