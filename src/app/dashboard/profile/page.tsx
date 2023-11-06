"use client";
import BackButton from "@/components/extras/BackButton";
import userService from "@/services/user.service";
import { useFormik } from "formik";
import { useRouter } from "next13-progressbar";
import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import useToast from "@/context/toast";
import { updateProfileSchema } from "@/utils/validation";
import { LuPen } from "react-icons/lu";
import { getInitials, isObjectEmpty } from "@/utils/misc";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextArea from "@/components/form/FormTextArea";
import FormPhoneNumberInput from "@/components/form/FormPhoneNumberInput";
import FormTextInput from "@/components/form/FormTextInput";
import InterestSelector from "./component/interest-selector";
import { ICategory } from "@/services/types";

const DashboardProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openToast } = useToast();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const interests = queryClient.getQueryData<ICategory[]>(["interest"]);
  // const dispatch = useDispatch();
  const [isChangingProfileImage, setIsChangingProfileImage] = useState(false);
  const selectImage = () => {
    const fileInput = document?.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e: any) => {
      setIsChangingProfileImage(true);
      const selectedFile: File = e.target?.files[0] || null;
      if (selectedFile) {
        userService
          .updateProfilePicture(user!.id, selectedFile)
          .then(() => {
            openToast({
              type: "success",
              text: "Profile picture updated",
            });
            queryClient.invalidateQueries({ queryKey: ["user"] });
            setIsChangingProfileImage(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    fileInput.click();
  };

  const updateProfileMutation = useMutation({
    mutationFn: (values: any) => userService.updateProfile(user!.id, values),
    onSuccess: (data) => {
      openToast({
        text: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      openToast({
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  const updateProfileFormik = useFormik({
    initialValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      phoneNumber: user?.profile?.phoneNumber,
      bio: user?.profile?.bio || "",
      interests: user?.profile?.interests?.map((i) => i.name),
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      updateProfileMutation.mutate(values);
    },
  });
  return (
    <main className="">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Edit Profile</h1>
        </div>
        <div className="mt-12">
          <div className="relative max-w-max mx-auto">
            {user?.profile?.profilePicture ? (
              <div
                className="h-[152px] w-[152px] rounded-full"
                style={{ backgroundImage: `url(${user.profile.profilePicture})`, backgroundSize: "100% 100%", backgroundPosition: "center" }}
              ></div>
            ) : (
              <div className=" rounded-full bg-tib-light-blue h-[152px] w-[152px] overflow-hidden flex items-center justify-center">
                {isChangingProfileImage ? (
                  <div className="lds-ring transform scale-150">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-tib-purple uppercase">{getInitials(user)}</span>
                )}
              </div>
            )}

            <div className="absolute bottom-0 right-0 profile-image-button">
              <button
                onClick={() => selectImage()}
                className="h-12 w-12 rounded-full bg-white border border-[#E0E0E0] flex items-center justify-center"
              >
                <LuPen size={30} className=" text-blue-500" />
                <div className="profile-image-hover hidden absolute -right-6 top-1/2 -translate-y-1/2 translate-x-full transform w-[100px]  rounded-lg bg-tib-purple py-3 px-4">
                  <span className="text-white font-black text-left text-sm leading-tight block ">Edit Picture</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={updateProfileFormik.handleSubmit} className="mt-16">
          <div className="space-y-5 mb-16">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <FormTextInput
                onChange={updateProfileFormik.handleChange}
                onBlur={updateProfileFormik.handleBlur}
                value={updateProfileFormik.values.firstName}
                placeholder="E.g kastroud"
                name="firstName"
                label="First Name"
                error={
                  updateProfileFormik.errors.firstName && updateProfileFormik.touched.firstName ? updateProfileFormik.errors.firstName : undefined
                }
              />
              <FormTextInput
                onChange={updateProfileFormik.handleChange}
                onBlur={updateProfileFormik.handleBlur}
                value={updateProfileFormik.values.lastName}
                placeholder="E.g kastroud"
                name="lastName"
                label="Last Name"
                error={updateProfileFormik.errors.lastName && updateProfileFormik.touched.lastName ? updateProfileFormik.errors.lastName : undefined}
              />
              <FormTextInput placeholder="E.g emailneeded@gmail.com" name="email" label="Email" disabled value={user?.email} />
              <FormPhoneNumberInput
                handleChange={(e) => {
                  updateProfileFormik.setFieldValue("phoneNumber", e);
                }}
                onBlur={updateProfileFormik.handleBlur}
                value={updateProfileFormik.values.phoneNumber}
                placeholder="E.g +23480 6453 3279"
                name="phoneNumber"
                label="Phone Number"
                error={
                  updateProfileFormik.errors.phoneNumber && updateProfileFormik.touched.phoneNumber
                    ? updateProfileFormik.errors.phoneNumber
                    : undefined
                }
              />
            </div>
            <FormTextArea
              onChange={updateProfileFormik.handleChange}
              onBlur={updateProfileFormik.handleBlur}
              value={updateProfileFormik.values.bio}
              name="bio"
              label="Bio"
              rows={6}
              min={150}
              placeholder="Tell us a little about yourself"
            />
          </div>
          <div className=" mb-16">
            <InterestSelector
              interests={interests || []}
              label="Area of Interest"
              onChange={(values) => {
                updateProfileFormik.setFieldValue("interests", values);
                updateProfileFormik.setFieldTouched("interests", true);
              }}
              values={updateProfileFormik?.values?.interests || []}
            />
          </div>
          <FormSubmit
            text="Submit"
            loading={updateProfileMutation.isPending}
            disabled={!isObjectEmpty(updateProfileFormik.errors) || isObjectEmpty(updateProfileFormik.touched)}
          />
        </form>
      </div>
    </main>
  );
};

export default DashboardProfile;
