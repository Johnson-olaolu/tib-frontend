import React, { ComponentProps } from "react";

interface IFormSubmit extends ComponentProps<"button"> {
  loading?: boolean;
  text: string;
}

const FormSubmit: React.FC<IFormSubmit> = (props) => {
  const { loading, text } = props;
  return (
    <button
      type="submit"
      {...props}
      className="h-16 w-full bg-tib-blue rounded font-abrilFatface flex items-center justify-center text-white disabled:bg-tib-light-purple"
    >
      {!loading ? (
        text
      ) : (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </button>
  );
};

export default FormSubmit;
