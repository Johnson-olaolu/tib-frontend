import https from "@/utils/https";
import { IComment, IIdea, IIdeaConstant, IIdeaQuery, ILike, IResponse, IShare, LIkeTypeEnum } from "./types";
import { IFundingNeededFields } from "@/app/dashboard/vault/idea/create/funding-needed/context";
import { IForSaleFields } from "@/app/dashboard/vault/idea/create/for-sale/context";

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

const createIdeaFundingNeeded = async (userId: string, data: IFundingNeededFields): Promise<IResponse<IIdea>> => {
  var formData = new FormData();

  formData.append("userId", userId);
  formData.append("title", data?.title || "");
  formData.append("description", data?.description || "");
  for (let i = 0; i < data.categories!.length; i++) {
    formData.append("categories[]", data.categories![i]);
  }
  for (let i = 0; i < data.media!.length; i++) {
    formData.append("media[]", data.media![i]);
  }
  formData.append("role", data?.role || "");
  for (let i = 0; i < data.collaborators!.length; i++) {
    formData.append("collaborators[]", data.collaborators![i]);
  }
  data.location && formData.append("location", data.location);
  data.website && formData.append("website", data.website);

  for (let i = 0; i < data.socialMediaLinks!.length; i++) {
    formData.append("socialMediaLinks[][name]", data.socialMediaLinks![i].name);
    formData.append("socialMediaLinks[][url]", data.socialMediaLinks![i].url);
  }
  for (let i = 0; i < data.competitors!.length; i++) {
    formData.append("competitors[]", data.competitors![i]);
  }
  formData.append("valuation[currency]", data?.valuation?.currency || "");
  formData.append("valuation[value]", data?.valuation?.value.toString() || "");
  formData.append("executionCost[currency]", data?.executionCost?.currency || "");
  formData.append("executionCost[value]", data?.executionCost?.value.toString() || "");
  formData.append("ROITimeline", data?.ROITimeline || "");
  formData.append("projectedRevenue[currency]", data?.projectedRevenue?.currency || "");
  formData.append("projectedRevenue[value]", data?.projectedRevenue?.value.toString() || "");
  formData.append("fundingStage", data?.fundingStage || "");
  formData.append("totalMoneyRaised[currency]", data?.totalMoneyRaised?.currency || "");
  formData.append("totalMoneyRaised[value]", data?.totalMoneyRaised?.value.toString() || "");
  return await https.postForm({
    url: `/idea/funding-needed`,
    body: formData,
  });
};

const createIdeaForSale = async (userId: string, data: IForSaleFields): Promise<IResponse<IIdea>> => {
  var formData = new FormData();

  formData.append("userId", userId);
  formData.append("title", data?.title || "");
  formData.append("description", data?.description || "");
  for (let i = 0; i < data.categories!.length; i++) {
    formData.append("categories[]", data.categories![i]);
  }
  for (let i = 0; i < data.media!.length; i++) {
    formData.append("media[]", data.media![i]);
  }
  formData.append("role", data?.role || "");
  for (let i = 0; i < data.collaborators!.length; i++) {
    formData.append("collaborators[]", data.collaborators![i]);
  }
  data.location && formData.append("location", data.location);
  data.website && formData.append("website", data.website);

  for (let i = 0; i < data.socialMediaLinks!.length; i++) {
    formData.append("socialMediaLinks[][name]", data.socialMediaLinks![i].name);
    formData.append("socialMediaLinks[][url]", data.socialMediaLinks![i].url);
  }
  for (let i = 0; i < data.competitors!.length; i++) {
    formData.append("competitors[]", data.competitors![i]);
  }
  formData.append("ideaCost[currency]", data?.ideaCost?.currency || "");
  formData.append("ideaCost[value]", data?.ideaCost?.value.toString() || "");
  formData.append("sellingReason", data?.sellingReason || "");

  return await https.postForm({
    url: `/idea/for-sale`,
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

const comment = async (ideaId: string, userId: string, type: LIkeTypeEnum, comment: string, commentId?: string): Promise<IResponse<IComment>> => {
  return await https.post({
    url: `/idea/${ideaId}/comment`,
    body: { userId, type, comment, commentId },
  });
};

const getComments = async (ideaId: string, id: string, type: LIkeTypeEnum): Promise<IResponse<IComment[]>> => {
  return await https.get({
    url: `/idea/${ideaId}/comment`,
    query: { type, id },
  });
};

const getIdeaConstant = async (name: string): Promise<IResponse<IIdeaConstant>> => {
  return await https.get({
    url: `idea-constants/findByName`,
    query: { name },
  });
};

const ideaService = {
  like,
  unLike,
  share,
  unShare,
  createIdeaSimple,
  createIdeaFundingNeeded,
  createIdeaForSale,
  queryIdeaSimple,
  comment,
  getComments,
  getIdeaConstant,
};
export default ideaService;
