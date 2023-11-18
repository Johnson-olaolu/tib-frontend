import https from "@/utils/https";
import { IComment, IIdea, IIdeaQuery, ILike, IResponse, IShare, LIkeTypeEnum } from "./types";

const createIdeaSimple = async (data: {
  userId: string;
  title: string;
  description: string;
  categories: string[];
  collaborators: string[];
  media: File[];
}): Promise<IResponse<IIdea>> => {
  var formData = new FormData();

  formData.append("userId", data.userId);
  formData.append("title", data.title);
  formData.append("description", data.description);
  for (let i = 0; i < data.categories.length; i++) {
    formData.append("categories[]", data.categories[i]);
  }
  for (let i = 0; i < data.media.length; i++) {
    formData.append("media[]", data.media[i]);
  }
  for (let i = 0; i < data.collaborators.length; i++) {
    formData.append("collaborators[]", data.collaborators[i]);
  }
  return await https.postForm({
    url: `/idea/simple`,
    body: formData,
  });
};

const queryIdeaSimple = async (query: IIdeaQuery): Promise<IResponse<IIdea[]>> => {
  return await https.get({
    url: "/idea/simple/query",
    query: query,
  });
};

const like = async (ideaId: string, userId: string, type: LIkeTypeEnum): Promise<IResponse<ILike>> => {
  return await https.post({
    url: `/idea/${ideaId}/like`,
    body: { userId, type },
  });
};

const unLike = async (ideaId: string, likeId: string): Promise<IResponse<boolean>> => {
  return await https.delete({
    url: `/idea/${ideaId}/like/${likeId}`,
  });
};

const share = async (ideaId: string, userId: string, type: LIkeTypeEnum): Promise<IResponse<IShare>> => {
  return await https.post({
    url: `/idea/${ideaId}/share`,
    body: { userId, type },
  });
};

const unShare = async (ideaId: string, shareId: string): Promise<IResponse<boolean>> => {
  return await https.delete({
    url: `/idea/${ideaId}/share/${shareId}`,
  });
};

const comment = async (ideaId: string, userId: string, type: LIkeTypeEnum, comment: string): Promise<IResponse<IComment>> => {
  return await https.post({
    url: `/idea/${ideaId}/comment`,
    body: { userId, type, comment },
  });
};

const getComments = async (ideaId: string, id: string, type: LIkeTypeEnum): Promise<IResponse<IComment[]>> => {
  return await https.get({
    url: `/idea/${ideaId}/comment`,
    query: { type, id },
  });
};

const ideaService = {
  like,
  unLike,
  share,
  unShare,
  createIdeaSimple,
  queryIdeaSimple,
  comment,
  getComments,
};
export default ideaService;
