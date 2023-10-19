import React from "react";
import { IFormText } from "./FormTextInput";
import { IAmount } from "@/utils/types";
import { formatAmount } from "@/utils/misc";

interface IFormAmountInput extends IFormText {
  showCurrencySelector?: boolean;
  amount: IAmount;
  onChangeCurrency?: (currency: string) => void;
  onChangeValue: (value: number | undefined) => void;
}

const FormAmountInput: React.FC<IFormAmountInput> = (props) => {
  const { error, name, label, required, optional, disabled, showCurrencySelector, amount, onChangeCurrency, onChangeValue } = props;
  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className="flex gap-2 w-full">
        {showCurrencySelector && (
          <select name="" id="" value={amount?.currency || "NGN"} className="amount-select">
            <option value="USD">$</option>
            <option value="NGN">₦</option>
          </select>
        )}

        <input
          {...props}
          value={formatAmount(amount?.value)}
          onChange={(e) => onChangeValue(parseFloat(e.target.value.replace(/,/g, "")) || undefined)}
          className="p-4 rounded flex-grow-1  w-full text-sm border border-[#C2C2C2] focus-visible:outline-none"
          type="text"
        />
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormAmountInput;
