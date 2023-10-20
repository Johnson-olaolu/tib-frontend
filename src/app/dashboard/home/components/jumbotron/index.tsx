import React from "react";
import ShareIdeaCard from "./components/ShareIdeaCard";
import IdeaEngagementCard from "./components/IdeaEngagementCard";
import WalletCard from "./components/WalletCard";
import AccessVaultCard from "./components/AccessVaultCard";

const DashboardHomeJumbotron = () => {
  return (
    <div className=" px-24 py-12 h-[632px]" style={{ background: `url("/images/DashboardJumbotronBg.png")`, backgroundSize: "100 100" }}>
      <div className=" max-w-md space-y-1">
        <h2 className="font-black text-tib-white text-6xl">Hello Melvin!</h2>
        <p className=" text-tib-white text-xl">Ready to bring your idea to the world? Let’s get started!</p>
      </div>
      <div className="mt-16 flex items-center justify-center gap-7">
        <ShareIdeaCard />
        <IdeaEngagementCard />
        <WalletCard />
        <AccessVaultCard />
      </div>
    </div>
  );
};

export default DashboardHomeJumbotron;
