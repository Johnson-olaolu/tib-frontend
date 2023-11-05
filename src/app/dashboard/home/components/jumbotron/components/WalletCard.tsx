"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import walletService from "@/services/wallet.service";
import { IUser } from "@/services/types";
import { formatAmount } from "@/utils/misc";

const WalletCard = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["user"]);
  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await walletService.fetchUserWallet(user?.id || "");
      return res.data;
    },
  });

  useEffect(() => {
    console.log({ wallet });
  }, [wallet]);
  return (
    <div
      className=" h-60 w-[262px] rounded p-6 flex flex-col justify-between items-stretch bg-tib-white"
      style={{
        boxShadow: "6.58125px 6.58125px 11.51719px 0px rgba(194, 191, 191, 0.20)",
      }}
    >
      <p className=" text-xl font-bold text-tib-purple text-center">My Ideas</p>
      <div className="text-center text-tib-purple space-y-3">
        <p className="text-sm font-abrilFatface">Your Account Balance </p>
        <p className=" font-bold text-3xl">{`₦${formatAmount(wallet?.balance || 0) || 0}`}</p>
      </div>
      <div className="flex justify-between gap-2">
        <Link
          href={"/dashboard/wallet/withdraw"}
          className="px-[10px] py-3 w-full text-center rounded border border-tib-blue text-tib-blue bg-white text-sm "
        >
          Withdraw
        </Link>
        <Link
          href={"/dashboard/wallet/top-up"}
          className="px-[10px] py-3 w-full rounded text-center border border-tib-blue  text-tib-white bg-tib-blue text-sm "
        >
          Fund
        </Link>
      </div>
    </div>
  );
};

export default WalletCard;
