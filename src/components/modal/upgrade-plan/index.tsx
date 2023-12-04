import React from "react";
import { FiX } from "react-icons/fi";
import ModalWrapper from "..";
import { IModal } from "@/context/modal/types";
import planService from "@/services/plan.service";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user.service";
import walletService from "@/services/wallet.service";

const UpgradePlanModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data } = props;

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const data = await walletService.fetchUserWallet(user?.id || "");
      return data.data;
    },
  });

  const { data: plan } = useQuery({
    queryKey: ["plan", data],
    queryFn: async () => {
      const res = await planService.getSinglePlan(data || "");
      return res.data;
    },
  });

  return (
    <ModalWrapper
      bodyStyle={{
        className: "bg-white flex-grow relative rounded",
        style: { maxWidth: "960px" },
      }}
      showModal={showModal}
      onClose={onClose}
      allowOnClickOutside
    >
      <div className="h-[540px] flex relative pt-[90px] px-[92px] bg-tib-white ">
        <FiX className=" absolute top-7 right-8" role="button" onClick={() => onClose()} />
        {wallet!.balance >= plan!.price ? (
          <div className=" w-full">
            <h6 className=" font-bold text-3xl text-tib-purple text-center mb-16">
              Confirm payment of {`₦${plan?.price}`} to upgrade your plan to premium
            </h6>
            {/* <FormSubmit text={"Confirm"}/> */}
            <button className=" h-16 w-full bg-tib-blue text-white flex items-center justify-center font-bold rounded">Continue</button>
          </div>
        ) : (
          <div className=" w-full">
            <h6 className=" font-bold text-2xl text-tib-purple text-center"></h6>
            <p className=""></p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default UpgradePlanModal;
