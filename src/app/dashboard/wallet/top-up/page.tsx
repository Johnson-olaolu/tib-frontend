"use client";
import BackButton from "@/components/extras/BackButton";
import React, { useEffect } from "react";
import WalletCreditCard from "./component/WalletCreditCard";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Mulish } from "next/font/google";
import { FiPlus } from "react-icons/fi";
import { useFormik } from "formik";
import { useRouter } from "next13-progressbar";
import { io } from "socket.io-client";
import useToast from "@/context/toast";
import useModal from "@/context/modal";
import { IPaymentMethod, ITransaction, IUser } from "@/services/types";
import walletService from "@/services/wallet.service";
import { formatAmount } from "@/utils/misc";
import { fundWalletValidationSchema } from "@/utils/validation";
import FormAmountInput from "@/components/form/FormAmountInput";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import PaymentMethodBadge from "@/app/onboarding/wallet/components/PaymentMethodBadge";
import FormSubmit from "@/components/form/FormSubmit";

// If loading a variable font, you don't need to specify the font weight
const mulish = Mulish({ subsets: ["latin"] });

const WalletTopUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();
  const transactionSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  const user = queryClient.getQueryData<IUser>(["user"]);
  const paymentMethods = queryClient.getQueryData<IPaymentMethod[]>(["paymentMethod"]);
  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const data = await walletService.fetchUserWallet(user?.id || "");
      return data.data;
    },
  });

  const creditWalletMutation = useMutation({
    mutationFn: walletService.creditWallet,
    onSuccess: (data) => {
      openModal("confirm-transaction", data.data?.paystackTransactionUrl);
      if (data.data) {
        transactionSocket.on(data.data.id, (data: ITransaction) => {
          if (data.status === "success") {
            closeModal();
            openToast({
              title: "Transaction Successful",
              text: `₦${formatAmount(data.amount)} has been credited to your wallet`,
              type: "success",
            });
            queryClient.invalidateQueries({
              queryKey: ["wallet"],
            });
            router.push("/dashboard/home");
          } else {
            openToast({
              text: "Transaction Unsuccessful",
              type: "failure",
            });
          }
        });
      }
    },
    onError: (error: any) => {
      openToast({
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  useEffect(() => {
    return () => {
      transactionSocket.disconnect();
    };
  }, []);

  const fundWalletFormik = useFormik({
    initialValues: {
      amount: {
        currency: "NGN",
        value: 0,
      },
      password: "",
      paymentMethod: "",
    },
    validationSchema: fundWalletValidationSchema,
    onSubmit: async (values) => {
      // setIsSubmitting(true);
      // console.log(values);
      // openModal("confirm-transaction", "")
      creditWalletMutation.mutate({
        walletId: wallet?.id || "",
        body: values,
      });
    },
  });
  return (
    <main className="">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Top Up</h1>
        </div>
        <div className=" mt-16">
          <p className=" text-tib-primary text-xl">Wallet Balance:</p>
          <p className=" text-tib-purple font-bold text-3xl">NGN {wallet?.balance}</p>
        </div>
        <div className=" mt-8 flex gap-4">
          <WalletCreditCard />
          <button className={` w-64 rounded border-tib-blue border-2 border-dashed flex items-center justify-center ${mulish.className}`}>
            <div className="flex flex-col items-center gap-2 text-tib-blue">
              <FiPlus className="" size={24} />
              <span className="text-xs font-semibold">Add New Card</span>
            </div>
          </button>
        </div>
        <div className=" mt-16">
          <form onSubmit={fundWalletFormik.handleSubmit} className="">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <FormAmountInput
                onChangeValue={(value) => {
                  fundWalletFormik.setFieldValue("amount", { ...fundWalletFormik.values.amount, value });
                }}
                onBlur={fundWalletFormik.handleBlur}
                amount={fundWalletFormik.values.amount}
                placeholder="E.g 10,000"
                type="number"
                name="amount"
                label="Enter Amount"
                error={
                  fundWalletFormik.errors.amount?.value && fundWalletFormik.touched.amount?.value ? fundWalletFormik.errors.amount.value : undefined
                }
              />
              <FormPasswordInput
                onChange={fundWalletFormik.handleChange}
                onBlur={fundWalletFormik.handleBlur}
                value={fundWalletFormik.values.password}
                placeholder="Enter Password"
                name="password"
                label="Password"
                error={fundWalletFormik.errors.password && fundWalletFormik.touched.password ? fundWalletFormik.errors.password : undefined}
              />
            </div>
            <div className="mt-14 ">
              <div className="mb-14">
                <p className=" text-xs">Choose Default Payment Method</p>
                <div className="grid grid-cols-4 gap-5 mt-2">
                  {paymentMethods?.map((p) => (
                    <PaymentMethodBadge
                      paymentMethod={p}
                      active={fundWalletFormik.values.paymentMethod == p.name}
                      onClick={(name) => {
                        fundWalletFormik.setFieldValue("paymentMethod", name);
                      }}
                      key={p.id}
                    />
                  ))}
                </div>
              </div>
            </div>
            <FormSubmit text="Fund" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default WalletTopUp;
