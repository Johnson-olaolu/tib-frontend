import SimpleAvatarWithName from "@/components/extras/SimpleAvatarWIthName";
import React from "react";

interface ICollaborators {
  collaborators?: string[];
}

const Collaborators: React.FC<ICollaborators> = (props) => {
  const { collaborators } = props;

  if (collaborators && collaborators.length > 0) {
    return (
      <div className=" py-16" style={{ background: "rgba(64, 110, 255, 0.08)" }}>
        <div className="max-w-7xl flex flex-col items-center">
          <div className="text-center space-y-4">
            <h6 className=" text-lg font-bold text-tib-purple">Collaborators</h6>
            <p className=" text-tib-primary2">In the course of this idea actulaization I worked head to head with the following people:</p>
          </div>

          <ul className="list-disc flex items-center flex-wrap justify-center gap-6 mt-9">
            {collaborators?.map((collaborator) => (
              <li className="" key={collaborator}>
                <SimpleAvatarWithName userId={collaborator} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Collaborators;
