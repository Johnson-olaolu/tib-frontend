import FormMultipleSelect from "@/components/form/FormMultipleSelect";
import FormSelectWithSearch from "@/components/form/FormSelectWithSearch";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import FormWYSIWYGInput from "@/components/form/FormWYSIWYGInput";
import FormMediaSelect from "@/components/form/form-media-select";
import { isObjectEmpty } from "@/utils/misc";
import { vaultCreateIdeaFundingNeededForm1ValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React from "react";
import useVaultCreateIdeaDepositIdea from "../../context";

const VaultCreateIdeaFundingNeededFormPage1 = () => {
  const { setActiveStep } = useVaultCreateIdeaDepositIdea();
  const vaultCreateIdeaFundingNeededForm1Formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      role: "",
      categories: [] as string[],
      collaborators: [] as string[],
      media: [] as File[],
    },
    validationSchema: vaultCreateIdeaFundingNeededForm1ValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      setActiveStep("Additional Information");
    },
  });
  return (
    <form className=" mt-12" onSubmit={vaultCreateIdeaFundingNeededForm1Formik.handleSubmit}>
      <div className=" mb-12 space-y-5">
        <FormTextInput
          onChange={vaultCreateIdeaFundingNeededForm1Formik.handleChange}
          onBlur={vaultCreateIdeaFundingNeededForm1Formik.handleBlur}
          value={vaultCreateIdeaFundingNeededForm1Formik.values.title}
          placeholder="Give a title"
          name="title"
          label="Title"
          error={
            vaultCreateIdeaFundingNeededForm1Formik.errors.title && vaultCreateIdeaFundingNeededForm1Formik.touched.title
              ? vaultCreateIdeaFundingNeededForm1Formik.errors.title
              : undefined
          }
        />
        <FormWYSIWYGInput
          name="description"
          label="Your Idea Description"
          min={150}
          value={vaultCreateIdeaFundingNeededForm1Formik.values.description}
          setValue={(value) => vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("description", value)}
          error={
            vaultCreateIdeaFundingNeededForm1Formik.errors.description && vaultCreateIdeaFundingNeededForm1Formik.touched.description
              ? vaultCreateIdeaFundingNeededForm1Formik.errors.description
              : undefined
          }
        />
        <FormSelectWithSearch
          name="category"
          label="Category"
          type="interest"
          values={vaultCreateIdeaFundingNeededForm1Formik.values.categories}
          handleClick={(value) => {
            const newValues = vaultCreateIdeaFundingNeededForm1Formik.values.categories;
            if (!newValues.includes(value)) {
              newValues.push(value);
            }
            vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("categories", newValues);
          }}
          handleRemove={(value) => {
            const newValues = vaultCreateIdeaFundingNeededForm1Formik.values.categories.filter((v) => v !== value);
            vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("categories", newValues);
          }}
          placeholder="Add one more category"
          optional
        />
        <FormMediaSelect
          values={vaultCreateIdeaFundingNeededForm1Formik.values.media}
          onChangeFiles={(files) => vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("media", files)}
          name="media"
          label="Upload Media"
          optional
        />
        <FormMultipleSelect
          name="role"
          label="Role"
          constant="Role"
          onChange={vaultCreateIdeaFundingNeededForm1Formik.handleChange}
          value={vaultCreateIdeaFundingNeededForm1Formik.values.role}
          setValue={(value) => vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("role", value)}
          onBlur={vaultCreateIdeaFundingNeededForm1Formik.handleBlur}
          error={
            vaultCreateIdeaFundingNeededForm1Formik.errors.role && vaultCreateIdeaFundingNeededForm1Formik.touched.role
              ? vaultCreateIdeaFundingNeededForm1Formik.errors.role
              : undefined
          }
        />
        <FormSelectWithSearch
          placeholder="Tag other collaborators"
          name="collaborators"
          label="Tag other collaborators"
          type="user"
          values={vaultCreateIdeaFundingNeededForm1Formik.values.collaborators}
          handleClick={(value) => {
            const newValues = vaultCreateIdeaFundingNeededForm1Formik.values.collaborators;
            if (!newValues.includes(value)) {
              newValues.push(value);
            }
            vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("collaborators", newValues);
          }}
          handleRemove={(value) => {
            const newValues = vaultCreateIdeaFundingNeededForm1Formik.values.collaborators.filter((v) => v !== value);
            vaultCreateIdeaFundingNeededForm1Formik.setFieldValue("collaborators", newValues);
          }}
          optional
        />
      </div>
      <FormSubmit
        //   loading={createIdeaSimpleMutation.isPending}
        text="Share Idea"
        disabled={!isObjectEmpty(vaultCreateIdeaFundingNeededForm1Formik.errors) || isObjectEmpty(vaultCreateIdeaFundingNeededForm1Formik.touched)}
      />
    </form>
  );
};

export default VaultCreateIdeaFundingNeededFormPage1;
