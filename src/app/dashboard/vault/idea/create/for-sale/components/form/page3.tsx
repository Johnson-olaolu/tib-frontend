import React, { useState } from "react";
import useVaultCreateFundingNeededIdea from "../../context";
import { useFormik } from "formik";
import { vaultCreateIdeaForSaleForm3ValidationSchema, vaultCreateIdeaFundingNeededForm3ValidationSchema } from "@/utils/validation";
import FormAmountInput from "@/components/form/FormAmountInput";
import Link from "next/link";
import FormMultipleSelect from "@/components/form/FormMultipleSelect";
import FormSubmit from "@/components/form/FormSubmit";
import { isObjectEmpty } from "@/utils/misc";
import FormTextArea from "@/components/form/FormTextArea";

const VaultCreateIdeaFundingNeededFormPage3 = () => {
  const {
    setFormFields,
    formFields,
    setActiveStep,
    isPending,
    createIdeaForSaleMutation: createIdeaFundingNeededMutation,
  } = useVaultCreateFundingNeededIdea();
  const [confirmTerms, setConfirmTerms] = useState(false);
  const vaultCreateIdeaForSaleForm3Formik = useFormik({
    initialValues: {
      sellingReason: formFields.sellingReason || "",
      ideaCost: formFields.ideaCost || {
        currency: "NGN",
        value: 0,
      },
    },
    validationSchema: vaultCreateIdeaForSaleForm3ValidationSchema,
    onSubmit: (values) => {
      setFormFields({ ...formFields, ...values });
      createIdeaFundingNeededMutation.mutate();
    },
  });
  return (
    <form className=" mt-12" onSubmit={vaultCreateIdeaForSaleForm3Formik.handleSubmit}>
      <div className=" mb-12 space-y-5">
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaForSaleForm3Formik.setFieldValue("ideaCost", {
              ...vaultCreateIdeaForSaleForm3Formik.values.ideaCost,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaForSaleForm3Formik.handleBlur}
          amount={vaultCreateIdeaForSaleForm3Formik.values.ideaCost}
          placeholder="E.g 10,000"
          type="number"
          name="ideaCost"
          label="Cost of Idea"
          error={
            vaultCreateIdeaForSaleForm3Formik.errors.ideaCost?.value && vaultCreateIdeaForSaleForm3Formik.touched.ideaCost?.value
              ? vaultCreateIdeaForSaleForm3Formik.errors.ideaCost.value
              : undefined
          }
        />
        <FormTextArea
          name="sellingReason"
          label="Reason for selling"
          onChange={vaultCreateIdeaForSaleForm3Formik.handleChange}
          onBlur={vaultCreateIdeaForSaleForm3Formik.handleBlur}
        />
      </div>
      <div className="">
        <label htmlFor="" className=" flex gap-2 items-center">
          <input type="checkbox" checked={confirmTerms} onChange={() => setConfirmTerms(!confirmTerms)} />
          <p className=" leading-tight ">
            I accept the{" "}
            <Link href={"#"} className=" text-tib-blue font-bold">
              Terms & Conditions
            </Link>{" "}
            of TIB before an idea can be successfully deposited in the vault.
          </p>
        </label>
      </div>
      <div className=" mt-14 flex gap-9">
        <button
          onClick={() => setActiveStep("Additional Information")}
          type="button"
          className=" h-16 w-full rounded border-tib-blue border bg-tib-white text-tib-blue font-bold flex items-center justify-center"
        >
          Previous
        </button>
        {/* <button
          type="submit"
          className="h-16 w-full rounded border-tib-blue border bg-tib-blue text-tib-white font-bold flex items-center justify-center"
        >
          Deposit Idea
        </button> */}
        <FormSubmit loading={isPending} text="Create Idea" disabled={!isObjectEmpty(vaultCreateIdeaForSaleForm3Formik.errors) || !confirmTerms} />
      </div>
    </form>
  );
};

export default VaultCreateIdeaFundingNeededFormPage3;
