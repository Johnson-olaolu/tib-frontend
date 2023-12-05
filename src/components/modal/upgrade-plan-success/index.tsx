import React from "react";
import { FiX } from "react-icons/fi";
import ModalWrapper from "..";
import { IModal } from "@/context/modal/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UpgradePlanSuccessModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data } = props;
  const router = useRouter();
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
      <div className="flex relative py-[90px] px-[80px] bg-tib-white ">
        <FiX className=" absolute top-7 right-8" role="button" onClick={() => onClose()} />
        <div className=" flex flex-col items-center gap-5 max-w-md mx-auto">
          <Image src="/images/rafiki.svg" width={240} height={180} alt="rafiki" />
          <h6 className=" text-center font-bold text-tib-purple text-4xl">
            You now have access to the <br /> <strong>The Idea Bank Vault</strong>
          </h6>
          <p className=" text-primary text-center">
            You have successfully subscribed to be a premium user. You can now buy, sell, share and deposit idea.
          </p>
          <button
            onClick={() => {
              router.push("/dashboard/vault/home");
              onClose();
            }}
            className=" h-14 w-full rounded bg-tib-blue text-tib-white  font-medium flex items-center justify-center mt-10"
          >
            Continue
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UpgradePlanSuccessModal;
