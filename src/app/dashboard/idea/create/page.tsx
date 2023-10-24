"use client";
import BackButton from "@/components/extras/BackButton";
import FormSelectWithSearch from "@/components/form/FormSelectWithSearch";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import FormWYSIWYGInput from "@/components/form/FormWYSIWYGInput";
import FormMediaSelect from "@/components/form/form-media-select";
import { useFormik } from "formik";
import React from "react";

const Page = () => {
  const createIdeaSimpleFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      categories: [] as string[],
      collaborators: [] as string[],
      media: [],
    },
    onSubmit: () => {},
  });
  return (
    <main className="">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Share your Idea</h1>
          <p className="text-xl">You are just a few steps away from greatness</p>
        </div>
        <form className=" mt-12">
          <div className=" mb-12 space-y-5">
            <FormTextInput
              onChange={createIdeaSimpleFormik.handleChange}
              onBlur={createIdeaSimpleFormik.handleBlur}
              value={createIdeaSimpleFormik.values.title}
              placeholder="Give a title"
              name="title"
              label="Title"
              error={createIdeaSimpleFormik.errors.title && createIdeaSimpleFormik.touched.title ? createIdeaSimpleFormik.errors.title : undefined}
            />
            <FormWYSIWYGInput
              name="description"
              label="Your Idea Description"
              min={150}
              value={createIdeaSimpleFormik.values.description}
              setValue={(value) => createIdeaSimpleFormik.setFieldValue("description", value)}
              error={createIdeaSimpleFormik.errors.title && createIdeaSimpleFormik.touched.title ? createIdeaSimpleFormik.errors.title : undefined}
            />
            <FormMediaSelect name="media" label="Upload Media" optional />
            <FormSelectWithSearch name="collaborators" label="Tag other collaborators" optional />
          </div>
          <FormSubmit text="Share Idea" />
        </form>
      </div>
    </main>
  );
};

export default Page;
