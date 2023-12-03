import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import FormTextInput from "../../FormTextInput";
import FormSubmit from "../../FormSubmit";

interface ISelectSocialMediaModal {
  closeModal: () => void;
  value: { name: string; url: string }[];
  setValue: (data: { name: string; url: string }[]) => void;
}

const SelectSocialMediaModal: React.FC<ISelectSocialMediaModal> = (props) => {
  const { closeModal, setValue, value } = props;
  const [socialMedias, setSocialMedias] = useState<{ name: string; url: string }[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutsideInterestSelector = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        closeModal();
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideInterestSelector);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideInterestSelector);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      if (socialMedias.findIndex((s) => s.name === name) !== -1) {
        const index = socialMedias.findIndex((s) => s.name === name);
        const newhhh = [...socialMedias];
        newhhh.splice(index, 1, { name: name, url: value });
        setSocialMedias([...newhhh]);
      } else {
        setSocialMedias([...socialMedias, { name, url: value }]);
      }
    } else {
      setSocialMedias(socialMedias.filter((s) => s.name !== name));
    }
  };

  return (
    <div className=" h-screen w-screen fixed left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div ref={containerRef} className=" max-w-xl max-h-[700px] bg-white px-10 py-16 w-full relative overflow-auto">
        <FiX className=" absolute right-8 top-8  scale-150" role="button" onClick={() => closeModal()} />
        <div className="">
          <div className="">
            <p className=" text-tib-purple font-bold text-2xl text-center">Social Media Links</p>
            <div className=" mt-8 space-y-4">
              <FormTextInput
                name="instagram"
                label="Instagram"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "instagram")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="twitter"
                label="Twitter"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "twitter")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="linkedIn"
                label="LinkedIn"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "linkedIn")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="telegram"
                label="Telegram"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "telegram")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="reddit"
                label="Reddit"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "reddit")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="facebook"
                label="Facebook"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "facebook")?.url}
                onChange={handleChange}
              />
              <FormTextInput
                name="medium"
                label="Medium"
                placeholder="Enter Link"
                value={value.find((v) => v.name === "medium")?.url}
                onChange={handleChange}
              />
            </div>
            <div className="mt-8">
              <FormSubmit
                role="button"
                disabled={socialMedias.length == 0}
                text="Continue"
                onClick={() => {
                  setValue(socialMedias);
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSocialMediaModal;
