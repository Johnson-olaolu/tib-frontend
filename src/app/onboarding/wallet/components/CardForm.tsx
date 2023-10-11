import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import React from "react";

const CardForm = () => {
  return (
    <div className="">
      <p className="text-sm font-bold ">Card Details</p>
      <form className="mt-8">
        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-2 gap-5">
            <FormTextInput placeholder="Holder’s name" name="cardName" label="Card Name" />
            <FormTextInput placeholder="E.g 5399 0000 0000 0000" name="cardNumber" label="Card Number" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <FormTextInput placeholder="E.g 04/22" name="expiryDate" label="Expiry Date" />
            <FormTextInput placeholder="E.g 04/22" name="cvv" label="CVV" />
          </div>
        </div>
        <FormSubmit text="Fund" />
      </form>
    </div>
  );
};

export default CardForm;
