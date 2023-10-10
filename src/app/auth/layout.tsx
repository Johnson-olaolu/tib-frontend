import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`font-circularStd text-tib-primary h-screen overflow-hidden`}
      style={{
        background: `rgba(0, 0, 0, 0.83) url("/images/auth-bg.png")`,
        backgroundBlendMode: "multiply",
        backgroundSize: "100% 120%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-screen w-full pl-32 pr-64 flex justify-between items-center">
        <Image height={54} width={200} src="/images/logo2.png" alt="The Idea Bank Logo" className=" h-28 w-auto" />
        <div className="w-[400px] max-h-[700px] overflow-auto bg-white rounded-lg px-9 py-14">{children}</div>
      </div>
    </main>
  );
}
