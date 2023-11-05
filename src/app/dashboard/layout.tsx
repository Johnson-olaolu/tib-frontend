import DashboardAuthProvider from "./auth";
import DashboardProvider from "./provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthProvider>
      <DashboardProvider>{children}</DashboardProvider>
    </DashboardAuthProvider>
  );
}
