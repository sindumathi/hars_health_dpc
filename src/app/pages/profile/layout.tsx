import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "@/src/components/uiComponents/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <SideBar /> */}
      <main>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
