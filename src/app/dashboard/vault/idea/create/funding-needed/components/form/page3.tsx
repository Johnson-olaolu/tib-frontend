import React from "react";
import useVaultCreateIdeaDepositIdea from "../../context";
import { useFormik } from "formik";
import { vaultCreateIdeaFundingNeededForm3ValidationSchema } from "@/utils/validation";
import FormAmountInput from "@/components/form/FormAmountInput";
import Link from "next/link";
import FormMultipleSelect from "@/components/form/FormMultipleSelect";
import FormSubmit from "@/components/form/FormSubmit";
import { isObjectEmpty } from "@/utils/misc";

const VaultCreateIdeaFundingNeededFormPage3 = () => {
  const { setFormFields, formFields, setActiveStep } = useVaultCreateIdeaDepositIdea();
  const vaultCreateIdeaFundingNeededForm3Formik = useFormik({
    initialValues: {
      valuation: formFields.valuation || {
        currency: "NGN",
        value: 0,
      },
      costOfExecution: formFields.costOfExecution || {
        currency: "NGN",
        value: 0,
      },
      estimatedRoiTimeline: formFields.estimatedRoiTimeline || "",
      projectedRevenue: formFields.projectedRevenue || {
        currency: "NGN",
        value: 0,
      },
      fundingStage: formFields.fundingStage || "",
      totalMoneyRaised: formFields.totalMoneyRaised || {
        currency: "NGN",
        value: 0,
      },
    },
    validationSchema: vaultCreateIdeaFundingNeededForm3ValidationSchema,
    onSubmit: (values) => {
      setFormFields({ ...formFields, ...values });
    },
  });
  return (
    <form className=" mt-12" onSubmit={vaultCreateIdeaFundingNeededForm3Formik.handleSubmit}>
      <div className=" mb-12 space-y-5">
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("valuation", {
              ...vaultCreateIdeaFundingNeededForm3Formik.values.valuation,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          amount={vaultCreateIdeaFundingNeededForm3Formik.values.valuation}
          placeholder="E.g 10,000"
          type="number"
          name="valuation"
          label="Valuation"
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.valuation?.value && vaultCreateIdeaFundingNeededForm3Formik.touched.valuation?.value
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.valuation.value
              : undefined
          }
        />
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("costOfExecution", {
              ...vaultCreateIdeaFundingNeededForm3Formik.values.costOfExecution,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          amount={vaultCreateIdeaFundingNeededForm3Formik.values.costOfExecution}
          placeholder="E.g 10,000"
          type="number"
          name="costOfExecution"
          label="Cost of Execution"
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.costOfExecution?.value &&
            vaultCreateIdeaFundingNeededForm3Formik.touched.costOfExecution?.value
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.costOfExecution.value
              : undefined
          }
        />
        <FormMultipleSelect
          name="estimatedRoiTimeline"
          label="Estimated ROI Timeline"
          constant="Estimated ROI Timeline"
          onChange={vaultCreateIdeaFundingNeededForm3Formik.handleChange}
          value={vaultCreateIdeaFundingNeededForm3Formik.values.estimatedRoiTimeline}
          setValue={(value) => vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("estimatedRoiTimeline", value)}
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.estimatedRoiTimeline &&
            vaultCreateIdeaFundingNeededForm3Formik.touched.estimatedRoiTimeline
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.estimatedRoiTimeline
              : undefined
          }
        />
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("projectedRevenue", {
              ...vaultCreateIdeaFundingNeededForm3Formik.values.projectedRevenue,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          amount={vaultCreateIdeaFundingNeededForm3Formik.values.projectedRevenue}
          placeholder="E.g 10,000"
          type="number"
          name="projectedRevenue"
          label="Projected Revenue"
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.projectedRevenue?.value &&
            vaultCreateIdeaFundingNeededForm3Formik.touched.projectedRevenue?.value
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.projectedRevenue.value
              : undefined
          }
        />

        <FormMultipleSelect
          name="fundingStage"
          label="Funding Stage"
          constant="Funding Stage"
          onChange={vaultCreateIdeaFundingNeededForm3Formik.handleChange}
          value={vaultCreateIdeaFundingNeededForm3Formik.values.fundingStage}
          setValue={(value) => vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("fundingStage", value)}
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.fundingStage && vaultCreateIdeaFundingNeededForm3Formik.touched.fundingStage
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.fundingStage
              : undefined
          }
        />
        <FormAmountInput
          onChangeValue={(value) => {
            vaultCreateIdeaFundingNeededForm3Formik.setFieldValue("totalMoneyRaised", {
              ...vaultCreateIdeaFundingNeededForm3Formik.values.totalMoneyRaised,
              value,
            });
          }}
          showCurrencySelector
          onBlur={vaultCreateIdeaFundingNeededForm3Formik.handleBlur}
          amount={vaultCreateIdeaFundingNeededForm3Formik.values.totalMoneyRaised}
          placeholder="E.g 10,000"
          type="number"
          name="totalMoneyRaised"
          label="Total Money Raised"
          error={
            vaultCreateIdeaFundingNeededForm3Formik.errors.totalMoneyRaised?.value &&
            vaultCreateIdeaFundingNeededForm3Formik.touched.totalMoneyRaised?.value
              ? vaultCreateIdeaFundingNeededForm3Formik.errors.totalMoneyRaised.value
              : undefined
          }
        />
      </div>
      <div className="">
        <label htmlFor="" className=" flex gap-2 items-center">
          <input type="checkbox" />
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
        <FormSubmit
          text="Create Idea"
          disabled={!isObjectEmpty(vaultCreateIdeaFundingNeededForm3Formik.errors) || isObjectEmpty(vaultCreateIdeaFundingNeededForm3Formik.touched)}
        />
      </div>
    </form>
  );
};

export default VaultCreateIdeaFundingNeededFormPage3;
