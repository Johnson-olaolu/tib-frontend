"use client";
import FormSubmit from "@/components/form/FormSubmit";
import FormTextArea from "@/components/form/FormTextArea";
import FormTextInput from "@/components/form/FormTextInput";
import useToast from "@/context/toast";
import userService from "@/services/user.service";
import { RootState } from "@/store/appSlice";
import { saveUser } from "@/store/userSlice";
import { getInitials, isObjectEmpty } from "@/utils/misc";
import { updateProfileSchema } from "@/utils/validation";
import { useFormik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { LuPen } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import useOnboarding from "../context";
import FormPhoneNumberInput from "@/components/form/FormPhoneNumberInput";
import { useRouter } from "next13-progressbar";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Profile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setProfileData, onboardingData } = useOnboarding();
  const { openToast } = useToast();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const dispatch = useDispatch();
  const [isChangingProfileImage, setIsChangingProfileImage] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const selectImage = () => {
    setIsChangingProfileImage(true);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e: any) => {
      const selectedFile: File = e.target?.files[0] || null;
      if (selectedFile) {
        userService
          .updateProfilePicture(user!.id, selectedFile)
          .then(() => {
            openToast({
              type: "success",
              text: "Profile picture updated",
            });
            userService.getUserDetails().then((data2) => {
              dispatch(
                saveUser({
                  user: data2!.data!,
                })
              );
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    fileInput.click();
  };

  const updateProfileFormik = useFormik({
    initialValues: {
      firstName: onboardingData.firstName,
      lastName: onboardingData.lastName,
      phoneNumber: onboardingData.phoneNumber,
      bio: onboardingData.bio,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      setProfileData(values);
      router.push("/onboarding/interests");
    },
  });
  return (
    <div className=" pb-10">
      <h2 className=" text-tib-purple font-bold text-4xl text-center">Complete Profile</h2>
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
              error={updateProfileFormik.errors.firstName && updateProfileFormik.touched.firstName ? updateProfileFormik.errors.firstName : undefined}
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
                updateProfileFormik.errors.phoneNumber && updateProfileFormik.touched.phoneNumber ? updateProfileFormik.errors.phoneNumber : undefined
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
        <FormSubmit
          text="Submit"
          loading={isSubmitting}
          disabled={!isObjectEmpty(updateProfileFormik.errors) || isObjectEmpty(updateProfileFormik.touched)}
        />
      </form>
    </div>
  );
};

export default Profile;
