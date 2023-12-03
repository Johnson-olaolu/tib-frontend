import FacebookIcom from "@/app/assets/icons/social-media/FacebookIcom";
import InstagramIcon from "@/app/assets/icons/social-media/InstagramIcon";
import LinkedInIcon from "@/app/assets/icons/social-media/LinkedInIcon";
import MediumIcon from "@/app/assets/icons/social-media/MediumIcon";
import RedditIcon from "@/app/assets/icons/social-media/RedditIcon";
import TelegramIcon from "@/app/assets/icons/social-media/TelegramIcon";
import TwitterIcon from "@/app/assets/icons/social-media/TwitterIcon";
import Link from "next/link";
import React from "react";

interface IViewSocialMedia {
  data: { name: string; url: string };
}
const ViewSocialMedia: React.FC<IViewSocialMedia> = (props) => {
  const { data } = props;

  switch (data.name) {
    case "instagram":
      return (
        <Link href={data.url}>
          <InstagramIcon className=" scale-75" />
        </Link>
      );
    case "twitter":
      return (
        <Link href={data.url}>
          <TwitterIcon className=" scale-75" />
        </Link>
      );
    case "linkedIn":
      return (
        <Link href={data.url}>
          <LinkedInIcon className=" scale-75" />
        </Link>
      );
    case "telegram":
      return (
        <Link href={data.url}>
          <TelegramIcon className=" scale-75" />
        </Link>
      );
    case "reddit":
      return (
        <Link href={data.url}>
          <RedditIcon className=" scale-75" />
        </Link>
      );
    case "facebook":
      return (
        <Link href={data.url}>
          <FacebookIcom className=" scale-75" />
        </Link>
      );
    case "medium":
      return (
        <Link href={data.url}>
          <MediumIcon className=" scale-75" />
        </Link>
      );
    default:
      return null;
  }
};

export default ViewSocialMedia;
