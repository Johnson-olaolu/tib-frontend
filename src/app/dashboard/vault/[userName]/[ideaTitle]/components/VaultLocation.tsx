import React from "react";

interface IVaultLocation {
  location?: string;
}

const VaultLocation: React.FC<IVaultLocation> = (props) => {
  const { location } = props;
  return (
    <div className="">
      <h6 className="text-xl font-bold text-tib-purple">Location</h6>
      <p className=" text-tib-primary mt-4">{location}</p>
    </div>
  );
};

export default VaultLocation;
