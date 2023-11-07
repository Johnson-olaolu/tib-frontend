"use client";
import BackButton from "@/components/extras/BackButton";
import FormSelectWithSearch from "@/components/form/FormSelectWithSearch";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextInput from "@/components/form/FormTextInput";
import FormWYSIWYGInput from "@/components/form/FormWYSIWYGInput";
import FormMediaSelect from "@/components/form/form-media-select";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IUser } from "@/services/types";
import { isObjectEmpty } from "@/utils/misc";
import { createIdeaSimpleValidationSchema } from "@/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFormik } from "formik";
import { useRouter } from "next13-progressbar";
import React from "react";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openToast } = useToast();
  const user = queryClient.getQueryData<IUser>(["user"]);
  const createIdeaSimpleMutation = useMutation({
    mutationFn: ideaService.createIdeaSimple,
    onSuccess: (data) => {
      openToast({
        title: "Idea Created Successfully",
        text: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["idea"],
      });
      //Should change this to send to user profile page
      router.push(`/dashboard/home`);
    },
    onError: (error: any) => {
      console.log(error);
      openToast({
        title: "Idea creation unsuccesfulll",
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  const createIdeaSimpleFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      categories: [] as string[],
      collaborators: [] as string[],
      media: [] as File[],
    },
    validationSchema: createIdeaSimpleValidationSchema,
    onSubmit: (values) => {
      createIdeaSimpleMutation.mutate({ ...values, userId: user!.id });
      createIdeaSimpleFormik.resetForm();
    },
  });
  return (
    <main className="">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Share your Idea</h1>
          <p className="text-xl">You are just a few steps away from greatness</p>
        </div>
        <form className=" mt-12" onSubmit={createIdeaSimpleFormik.handleSubmit}>
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
            <FormSelectWithSearch
              name="category"
              label="Category"
              type="interest"
              values={createIdeaSimpleFormik.values.categories}
              handleClick={(value) => {
                const newValues = createIdeaSimpleFormik.values.categories;
                if (!newValues.includes(value)) {
                  newValues.push(value);
                }
                createIdeaSimpleFormik.setFieldValue("categories", newValues);
              }}
              handleRemove={(value) => {
                const newValues = createIdeaSimpleFormik.values.categories.filter((v) => v !== value);
                createIdeaSimpleFormik.setFieldValue("categories", newValues);
              }}
              placeholder="Add one more category"
              optional
            />
            <FormMediaSelect
              values={createIdeaSimpleFormik.values.media}
              onChangeFiles={(files) => createIdeaSimpleFormik.setFieldValue("media", files)}
              name="media"
              label="Upload Media"
              optional
            />
            <FormSelectWithSearch
              placeholder="Tag other collaborators"
              name="collaborators"
              label="Tag other collaborators"
              type="user"
              values={createIdeaSimpleFormik.values.collaborators}
              handleClick={(value) => {
                const newValues = createIdeaSimpleFormik.values.collaborators;
                if (!newValues.includes(value)) {
                  newValues.push(value);
                }
                createIdeaSimpleFormik.setFieldValue("collaborators", newValues);
              }}
              handleRemove={(value) => {
                const newValues = createIdeaSimpleFormik.values.collaborators.filter((v) => v !== value);
                createIdeaSimpleFormik.setFieldValue("collaborators", newValues);
              }}
              optional
            />
          </div>
          <FormSubmit
            loading={createIdeaSimpleMutation.isPending}
            text="Share Idea"
            disabled={!isObjectEmpty(createIdeaSimpleFormik.errors) || isObjectEmpty(createIdeaSimpleFormik.touched)}
          />
        </form>
      </div>
    </main>
  );
};

export default Page;
