import FormSelectSocialMedia from "@/components/form/form-select-social-media";
import FormMultipleTextInput from "@/components/form/FormMultipleTextInput";
import FormTextInput from "@/components/form/FormTextInput";
import { vaultCreateIdeaFundingNeededForm2ValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React from "react";

const VaultCreateIdeaFundingNeededFormPage2 = () => {
  const vaultCreateIdeaFundingNeededForm2Formik = useFormik({
    initialValues: {
      location: "",
      website: "",
      socialMediaLinks: [] as { name: string; url: string }[],
      competitors: [] as string[],
    },
    validationSchema: vaultCreateIdeaFundingNeededForm2ValidationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          value={vaultCreateIdeaFundingNeededForm2Formik.values.location}
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
      </div>
      <div className=" mt-14 flex gap-9">
        <button
          type="button"
          className=" h-16 w-full rounded border-tib-blue border bg-tib-white text-tib-blue font-bold flex items-center justify-center"
        >
          Previous
        </button>
        <button
          type="submit"
          className="h-16 w-full rounded border-tib-blue border bg-tib-blue text-tib-white font-bold flex items-center justify-center"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default VaultCreateIdeaFundingNeededFormPage2;
