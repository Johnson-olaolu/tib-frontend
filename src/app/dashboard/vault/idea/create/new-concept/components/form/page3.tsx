import React, { useState } from "react";
import useVaultCreateFundingNeededIdea from "../../context";
import { useFormik } from "formik";
import { vaultCreateIdeaFundingNeededForm3ValidationSchema, vaultCreateIdeaNewConceptForm3ValidationSchema } from "@/utils/validation";
import FormAmountInput from "@/components/form/FormAmountInput";
import Link from "next/link";
import FormMultipleSelect from "@/components/form/FormMultipleSelect";
import FormSubmit from "@/components/form/FormSubmit";
import { isObjectEmpty } from "@/utils/misc";

const VaultCreateIdeaFundingNeededFormPage3 = () => {
  const {
    setFormFields,
    formFields,
    setActiveStep,
    isPending,
    createIdeaNewConceptMutation: createIdeaFundingNeededMutation,
  } = useVaultCreateFundingNeededIdea();
  const [confirmTerms, setConfirmTerms] = useState(false);
  const vaultCreateIdeaFundingNeededForm3Formik = useFormik({
    initialValues: {
      executionCost: formFields.executionCost || {
        currency: "NGN",
        value: 0,
      },
    },
    validationSchema: vaultCreateIdeaNewConceptForm3ValidationSchema,
    onSubmit: (values) => {
      setFormFields({ ...formFields, ...values });
      createIdeaFundingNeededMutation.mutate();
    },
  });
  return (
    <form className=" mt-12" onSubmit={vaultCreateIdeaFundingNeededForm3Formik.handleSubmit}>
      <div className=" mb-12 space-y-5">
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("executionCost", {
              ...vaultCreateIdeaFundingNeededForm3Formik.values.executionCost,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          amount={vaultCreateIdeaFundingNeededForm3Formik.values.executionCost}
          placeholder="E.g 10,000"
          type="number"
          name="executionCost"
          label="executionCost"
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.executionCost?.value &&
            vaultCreateIdeaFundingNeededForm3Formik.touched.executionCost?.value
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.executionCost.value
              : undefined
          }
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
        <FormSubmit
          loading={isPending}
          text="Create Idea"
          disabled={!isObjectEmpty(vaultCreateIdeaFundingNeededForm3Formik.errors) || !confirmTerms}
        />
      </div>
    </form>
  );
};

export default VaultCreateIdeaFundingNeededFormPage3;
