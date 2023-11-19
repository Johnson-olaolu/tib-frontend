import ViewSingleComment from "@/app/dashboard/components/idea/comment";
import ideaService from "@/services/idea.service";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

const ViewComments: React.FC<{ idea?: IIdea }> = (props) => {
  const { idea } = props;
  const { data: comments } = useQuery({
    queryKey: ["idea", idea?.user.userName, idea?.title, "comment"],
    queryFn: async () => {
      const res = await ideaService.getComments(idea?.id || "", idea?.id || "", LIkeTypeEnum.IDEA);
      return res.data;
    },
  });

  const parentsComments = useMemo(() => {
    return comments?.filter((c) => !c.parent);
  }, [comments]);
  return (
    <div className=" px-6">
      <div className=" space-y-8">
        {parentsComments?.map((comment) => (
          <ViewSingleComment idea={idea} comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default ViewComments;
