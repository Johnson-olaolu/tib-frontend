import { IUser } from "@/services/types";

export const validExtensions = ["jpg", "jpeg", "png", "gif", "pdf", "mp4", "avi", "mov", "wmv", "flv", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];

export const testUsers: IUser[] = [
  {
    id: "a9be1de2-194e-44e4-b3ad-2f17e8daddde",
    userName: "kastroud",
    email: "johnsonolaolu@gmail.com",
    isEmailVerified: true,
    roleName: "admin",
    planName: "Free",
    createdAt: new Date(),
    updatedAt: new Date(),
    profile: {
      id: "4fa2a6e1-37e9-4e3d-bfdc-4499343685c8",
      firstName: "Johnson",
      lastName: "Olaoluwa",
      phoneNumber: "+2347053332295",
      profilePicture: "",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dolores veritatis iusto? Minima exercitationem voluptates iure totam, labore mollitia veritatis maxime voluptatem at quo, neque, cum illo fugiat! Reprehenderit, porro?\n",
      createdAt: new Date(),
      updatedAt: new Date(),
      interests: [],
    },
  },
];
