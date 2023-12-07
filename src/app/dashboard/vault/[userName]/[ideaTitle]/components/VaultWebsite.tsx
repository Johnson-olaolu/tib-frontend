import Link from "next/link";
import React from "react";

interface IVaultWebsite {
  website?: string;
}

const VaultWebsite: React.FC<IVaultWebsite> = (props) => {
  const { website } = props;
  return (
    <div className="">
      <h6 className="text-xl font-bold text-tib-purple">Website</h6>
      <Link href={website || "#"} className=" text-tib-primary mt-4 block">
        {website || "website"}
      </Link>
    </div>
  );
};

export default VaultWebsite;
