import FormSelectSocialMedia from "@/components/form/form-select-social-media";
import FormMultipleTextInput from "@/components/form/FormMultipleTextInput";
import FormTextInput from "@/components/form/FormTextInput";
import { vaultCreateIdeaFundingNeededForm2ValidationSchema, vaultCreateIdeaNewConceptForm2ValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React from "react";
import FormSubmit from "@/components/form/FormSubmit";
import { isObjectEmpty } from "@/utils/misc";
import FormMediaSelect from "@/components/form/form-media-select";
import useVaultCreateFundingNeededIdea from "../../context";
import FormMultipleSelect from "@/components/form/FormMultipleSelect";

const VaultCreateIdeaFundingNeededFormPage2 = () => {
  const { setActiveStep, formFields, setFormFields } = useVaultCreateFundingNeededIdea();
  const vaultCreateIdeaFundingNeededForm2Formik = useFormik({
    initialValues: {
      location: formFields.location || "",
      website: formFields.website || "",
      socialMediaLinks: formFields.socialMediaLinks || ([] as { name: string; url: string }[]),
      competitors: formFields.competitors || ([] as string[]),
      seeking: formFields.seeking || "",
    },
    validationSchema: vaultCreateIdeaNewConceptForm2ValidationSchema,
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
        <FormMultipleSelect
          name="seeking"
          label="I’m Seeking"
          constant="Need"
          onChange={vaultCreateIdeaFundingNeededForm2Formik.handleChange}
          value={vaultCreateIdeaFundingNeededForm2Formik.values.seeking}
          setValue={(value) => vaultCreateIdeaFundingNeededForm2Formik.setFieldValue("seeking", value)}
          onBlur={vaultCreateIdeaFundingNeededForm2Formik.handleBlur}
          error={
            vaultCreateIdeaFundingNeededForm2Formik.errors.seeking && vaultCreateIdeaFundingNeededForm2Formik.touched.seeking
              ? vaultCreateIdeaFundingNeededForm2Formik.errors.seeking
              : undefined
          }
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

export default VaultCreateIdeaFundingNeededFormPage2;
