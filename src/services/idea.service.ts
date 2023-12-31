import https from "@/utils/https";
import { IIdea, IResponse } from "./types";

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
  formData.append("description", data.title);
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
    url: `/idea/create/simple`,
    body: formData,
  });
};

const ideaService = {
  createIdeaSimple,
};
export default ideaService;
