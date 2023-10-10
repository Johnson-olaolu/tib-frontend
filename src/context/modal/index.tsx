// import AddCard from 'components/modal/add-card';
// import AccessEarlyPayModal from 'components/modal/early-pay/access-earlypay';
// import EarlyPayIntroductionModal from 'components/modal/early-pay/EarlyPayIntroductionModal';
// import RequestEarlyPayModal from 'components/modal/early-pay/request-earlypay';
// import FundAccountModal from 'components/modal/fund-account';
// import PayBillsAirtimeModal from 'components/modal/pay-bills/airtime';
// import PayBillsElectricityModal from 'components/modal/pay-bills/electricity';
// import PayBillsInternetDataModal from 'components/modal/pay-bills/internet-data';
// import PayBillsTvPlansModal from 'components/modal/pay-bills/tv-plans';
// import UpdateNextOfKinModal from 'components/modal/profile/UpdateNextOfKinModal';
// import SendFundsModal from 'components/modal/send-funds';
// import TransactionDetailsModal from 'components/modal/transaction/TransactionDetailsModal';
// import UpgradeAccountModal from 'components/modal/upgrade-account';
// import React, { createContext, useContext, useMemo, useState } from 'react';
// import { IModalContext, ModalTypes } from './types';

// const ModalContext = createContext({});

// export const ModalContextProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [activeModal, setActiveModal] = useState<ModalTypes>();
//   const [data, setData] = useState<any>();
//   const openModal = (type: ModalTypes, payload?: any) => {
//     setShowModal(true);
//     setActiveModal(type);
//     setData(payload);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setActiveModal(undefined);
//     setData(undefined);
//   };

//   const getModal = () => {
//     switch (activeModal) {
//       case 'Add-Card':
//         return (
//           <AddCard data={data} onClose={closeModal} showModal={showModal} />
//         );
//       case 'Tier-Upgrade':
//         return (
//           <UpgradeAccountModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'Fund-Account':
//         return (
//           <FundAccountModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'Send-Funds':
//         return (
//           <SendFundsModal
//             data={null}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'Profile-UpdateNextOfKin':
//         return (
//           <UpdateNextOfKinModal
//             data={null}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'Transaction-Details':
//         return (
//           <TransactionDetailsModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'EarlyPay-Intro':
//         return (
//           <EarlyPayIntroductionModal
//             data={null}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'EarlyPay-Access':
//         return (
//           <AccessEarlyPayModal
//             data={null}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'EarlyPay-Request':
//         return (
//           <RequestEarlyPayModal
//             data={null}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'PayBills-Electricity':
//         return (
//           <PayBillsElectricityModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'PayBills-Airtime':
//         return (
//           <PayBillsAirtimeModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'PayBills-Internet-Data':
//         return (
//           <PayBillsInternetDataModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       case 'PayBills-Tv-Plans':
//         return (
//           <PayBillsTvPlansModal
//             data={data}
//             onClose={closeModal}
//             showModal={showModal}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const value = useMemo(
//     () => ({
//       openModal,
//       closeModal,
//       getModal,
//     }),
//     [getModal, data]
//   );
//   return (
//     <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
//   );
// };

// const useModal = (): IModalContext => useContext(ModalContext) as IModalContext;

// export default useModal;
