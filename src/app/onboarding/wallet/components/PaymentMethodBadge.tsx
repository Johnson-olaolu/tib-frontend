import { IPaymentMethod } from "@/services/types";
import Image from "next/image";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface IPaymentMethodBadge {
  paymentMethod: IPaymentMethod;
  active: boolean;
  onClick: (name: string) => void;
}

const PaymentMethodBadge: React.FC<IPaymentMethodBadge> = (props) => {
  const { paymentMethod, active, onClick } = props;
  return (
    <button className=" disabled:opacity-50" disabled={paymentMethod.disabled} onClick={() => onClick(paymentMethod.name)}>
      <div className="h-32 w-full rounded-lg border border-[#C2C2C2] flex items-center justify-center relative">
        {active && <BsFillCheckCircleFill className="text-green-600 absolute top-3 right-3" size={20} />}
        <div className="gap-3 text-center flex flex-col items-center">
          <Image height={24} width={100} src={paymentMethod.image} alt="" className=" h-6 w-auto" />
          <p className="">{paymentMethod.name}</p>
        </div>
      </div>
    </button>
  );
};

export default PaymentMethodBadge;
