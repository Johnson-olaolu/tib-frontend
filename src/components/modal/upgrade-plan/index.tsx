import React from "react";
import { FiX } from "react-icons/fi";
import ModalWrapper from "..";
import { IModal } from "@/context/modal/types";
import planService from "@/services/plan.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "@/services/user.service";
import walletService from "@/services/wallet.service";
import { useRouter } from "next/navigation";
import useToast from "@/context/toast";
import useModal from "@/context/modal";

const UpgradePlanModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data } = props;
  const router = useRouter();
  const { openToast } = useToast();
  const { openModal } = useModal();
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

  const upgradeUserMutation = useMutation({
    mutationFn: async () => {
      const res = await userService.upgradeUserPlan(user?.id || "", { plan: plan?.name || "" });
      return res;
    },
    onSuccess: (data) => {
      openToast({
        title: "Plan Upgrade Succesfull",
        text: `Plan Upgraded to ${data.data?.planName}`,
        type: "success",
      });
      openModal("upgrade-plan-success");
    },
  });

  const onClickConfirm = () => {
    upgradeUserMutation.mutate();
  };

  const onClickGoToWallet = () => {
    router.push("/dashboard/wallet/top-up");
    onClose();
  };
  return (
    <ModalWrapper
      bodyStyle={{
        className: "bg-white flex-grow relative rounded",
        style: { maxWidth: "760px" },
      }}
      showModal={showModal}
      onClose={onClose}
      allowOnClickOutside
    >
      <div className="h-[540px] flex relative pt-[90px] px-[92px] bg-tib-white ">
        <FiX className=" absolute top-7 right-8" role="button" onClick={() => onClose()} />
        {wallet && plan ? (
          <>
            {wallet.balance >= plan.price ? (
              <div className=" max-w-md mx-auto">
                <h6 className=" font-bold text-3xl text-tib-purple text-center mb-16">
                  Confirm payment of {`₦${plan?.price}`} to upgrade your plan to premium
                </h6>
                {/* <FormSubmit text={"Confirm"}/> */}
                <button
                  onClick={() => onClickConfirm()}
                  className=" h-16 w-full bg-tib-blue text-white flex items-center justify-center font-bold rounded"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className=" max-w-md mx-auto flex flex-col gap-10">
                <h6 className=" font-bold text-2xl text-tib-purple text-center ">
                  You currently do not have sufficient funds to upgrade to this plan
                </h6>
                <p className=" text-2xl font-bold text-center text-tib-purple">
                  {plan.name} : {plan.price}{" "}
                </p>
                <button
                  onClick={() => onClickGoToWallet()}
                  className=" h-16 w-full bg-tib-blue text-white flex items-center justify-center font-bold rounded"
                >
                  Top Up Wallet
                </button>
              </div>
            )}
          </>
        ) : (
          <>is Loading ...</>
        )}
      </div>
    </ModalWrapper>
  );
};

export default UpgradePlanModal;
