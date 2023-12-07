import FacebookIcom from "@/app/assets/icons/social-media/FacebookIcom";
import InstagramIcon from "@/app/assets/icons/social-media/InstagramIcon";
import LinkedInIcon from "@/app/assets/icons/social-media/LinkedInIcon";
import MediumIcon from "@/app/assets/icons/social-media/MediumIcon";
import RedditIcon from "@/app/assets/icons/social-media/RedditIcon";
import TelegramIcon from "@/app/assets/icons/social-media/TelegramIcon";
import TwitterIcon from "@/app/assets/icons/social-media/TwitterIcon";
import useToast from "@/context/toast";
import { copyText } from "@/utils/misc";
import Link from "next/link";
import React from "react";

interface IViewSocialMedia {
  data: { name: string; url: string };
}
const ViewSocialMedia: React.FC<IViewSocialMedia> = (props) => {
  const { openToast } = useToast();
  const { data } = props;

  switch (data.name) {
    case "instagram":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <InstagramIcon className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "twitter":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <TwitterIcon className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "linkedIn":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <LinkedInIcon className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "telegram":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <TelegramIcon className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "reddit":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <RedditIcon className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "facebook":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <FacebookIcom className=" scale-75" />
          <div className=" social-media-hover">
            {data.url}
            <button
              onClick={() => {
                copyText(data.url || "");
                openToast({
                  type: "info",
                  text: "Text Copied!",
                });
              }}
            >
              Copy
            </button>
          </div>
        </Link>
      );
    case "medium":
      return (
        <Link href={data.url} className=" relative view-social-media">
          <MediumIcon className=" scale-75" />
        </Link>
      );
    default:
      return null;
  }
};

export default ViewSocialMedia;
