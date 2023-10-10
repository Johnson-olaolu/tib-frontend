export type ModalTypes =
  | 'Tier-Upgrade'
  | 'Fund-Account'
  | 'Send-Funds'
  | 'Add-Card'
  | 'Profile-UpdateNextOfKin'
  | 'EarlyPay-Intro'
  | 'EarlyPay-Access'
  | 'EarlyPay-Request'
  | 'PayBills-Electricity'
  | 'PayBills-Airtime'
  | 'PayBills-Internet-Data'
  | 'PayBills-Tv-Plans'
  | 'Transaction-Details';

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
