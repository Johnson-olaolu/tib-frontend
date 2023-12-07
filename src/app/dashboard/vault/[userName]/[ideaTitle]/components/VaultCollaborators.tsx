import Avatar from "@/components/extras/Avatar";
import SimpleAvatarWithName from "@/components/extras/SimpleAvatarWithName";
import React from "react";

interface ICollaborators {
  collaborators?: string[];
}

const VaultCollaborators: React.FC<ICollaborators> = (props) => {
  const { collaborators } = props;
  return (
    <div className="">
      <h6 className="text-xl font-bold text-tib-purple">Collaborators</h6>
      <p className=" text-tib-primary mt-4">In the course of this idea actulaization i worked head to head with the following people:</p>
      <div className=" pl-5  mt-8">
        <ul className="">
          {collaborators?.map((collaborator) => (
            <li className="" key={collaborator}>
              <SimpleAvatarWithName userId={collaborator} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VaultCollaborators;
