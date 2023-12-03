import ideaService from "@/services/idea.service";
import { useQuery } from "@tanstack/react-query";
import React, { ComponentProps } from "react";

export interface IFormMultipleSelect extends ComponentProps<"input"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  constant?: string;
  setValue: (c: string) => void;
}

const FormMultipleSelect: React.FC<IFormMultipleSelect> = (props) => {
  const { disabled, name, optional, required, error, label, constant, value, setValue } = props;

  const { data } = useQuery({
    queryKey: ["ideaConstant", constant],
    queryFn: async () => {
      const res = await ideaService.getIdeaConstant(constant || "");
      console.log(res);
      return res.data;
    },
  });

  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className=" flex items-center gap-14">
        {data?.value.map((c) => (
          <label htmlFor={c} className="flex items-center gap-2 text-sm" key={c}>
            <input id={c} type="radio" className="h-5 w-5" value={c} onChange={(e) => setValue(c)} checked={value === c} />
            {c}
          </label>
        ))}
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormMultipleSelect;
