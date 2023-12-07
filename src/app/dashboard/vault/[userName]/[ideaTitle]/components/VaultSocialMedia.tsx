import ViewSocialMedia from "@/components/extras/ViewSocialMedia";
import React from "react";

interface IVaultSocialMedia {
  socialMediaLinks?: { name: string; url: string }[];
}

const VaultSocialMedia: React.FC<IVaultSocialMedia> = (props) => {
  const { socialMediaLinks } = props;

  return (
    <div className="">
      <h6 className="text-xl font-bold text-tib-purple">Social Media</h6>
      <div className="  mt-2 -ml-2 flex">
        {socialMediaLinks?.map((link) => (
          <ViewSocialMedia data={link} key={link.name} />
        ))}
      </div>
    </div>
  );
};

export default VaultSocialMedia;
