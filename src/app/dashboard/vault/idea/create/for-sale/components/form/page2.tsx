import FormSelectSocialMedia from "@/components/form/form-select-social-media";
import FormMultipleTextInput from "@/components/form/FormMultipleTextInput";
import FormTextInput from "@/components/form/FormTextInput";
import { vaultCreateIdeaForSaleForm2ValidationSchema, vaultCreateIdeaFundingNeededForm2ValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React from "react";
import FormSubmit from "@/components/form/FormSubmit";
import { isObjectEmpty } from "@/utils/misc";
import useVaultCreateForSaleIdea from "../../context";
import FormMediaSelect from "@/components/form/form-media-select";

const VaultCreateIdeaForSaleFormPage2 = () => {
  const { setActiveStep, formFields, setFormFields } = useVaultCreateForSaleIdea();
  const vaultCreateIdeaFundingNeededForm2Formik = useFormik({
    initialValues: {
      location: formFields.location || "",
      website: formFields.website || "",
      socialMediaLinks: formFields.socialMediaLinks || ([] as { name: string; url: string }[]),
      competitors: formFields.competitors || ([] as string[]),
      additionalAttachments: formFields.additionalAttachments || ([] as File[]),
    },
    validationSchema: vaultCreateIdeaForSaleForm2ValidationSchema,
    onSubmit: (values) => {
      setFormFields({ ...formFields, ...values });
      setActiveStep("Cost");
    },
  });
  return (
    <form className=" mt-12" onSubmit={vaultCreateIdeaFundingNeededForm2Formik.handleSubmit}>
      <div className=" mb-12 space-y-5">
        <FormTextInput
          onChange={vaultCreateIdeaFundingNeededForm2Formik.handleChange}
          onBlur={vaultCreateIdeaFundingNeededForm2Formik.handleBlur}
          value={vaultCreateIdeaFundingNeededForm2Formik.values.location}
          placeholder="Give a location"
          name="location"
          label="Location"
          error={
            vaultCreateIdeaFundingNeededForm2Formik.errors.location && vaultCreateIdeaFundingNeededForm2Formik.touched.location
              ? vaultCreateIdeaFundingNeededForm2Formik.errors.location
              : undefined
          }
        />

        <FormTextInput
          onChange={vaultCreateIdeaFundingNeededForm2Formik.handleChange}
          onBlur={vaultCreateIdeaFundingNeededForm2Formik.handleBlur}
          value={vaultCreateIdeaFundingNeededForm2Formik.values.website}
          placeholder="Give a website"
          name="website"
          label="Website"
          error={
            vaultCreateIdeaFundingNeededForm2Formik.errors.website && vaultCreateIdeaFundingNeededForm2Formik.touched.website
              ? vaultCreateIdeaFundingNeededForm2Formik.errors.website
              : undefined
          }
        />
        <FormSelectSocialMedia
          setValue={(data) => vaultCreateIdeaFundingNeededForm2Formik.setFieldValue("socialMediaLinks", data)}
          value={vaultCreateIdeaFundingNeededForm2Formik.values.socialMediaLinks}
          name="socialMedia"
          label="Social Media Links"
        />
        <FormMultipleTextInput
          name="competitors"
          label="Competitors (Similar idea, solution or service) "
          setValue={(data) => vaultCreateIdeaFundingNeededForm2Formik.setFieldValue("competitors", data)}
          value={vaultCreateIdeaFundingNeededForm2Formik.values.competitors}
          placeholder="Add more competitors (Optional)"
        />
        <FormMediaSelect
          values={vaultCreateIdeaFundingNeededForm2Formik.values.additionalAttachments}
          onChangeFiles={(files) => vaultCreateIdeaFundingNeededForm2Formik.setFieldValue("additionalAttachments", files)}
          name="additionalAttachments"
          label="Upload Media"
          optional
          dropLabel="Please attch anything else you would like to share with us. You can Drag or"
        />
      </div>
      <div className=" mt-14 flex gap-9">
        <button
          onClick={() => setActiveStep("Idea")}
          type="button"
          className=" h-16 w-full rounded border-tib-blue border bg-tib-white text-tib-blue font-bold flex items-center justify-center"
        >
          Previous
        </button>
        <FormSubmit text="Next" disabled={!isObjectEmpty(vaultCreateIdeaFundingNeededForm2Formik.errors)} />
      </div>
    </form>
  );
};

export default VaultCreateIdeaForSaleFormPage2;
