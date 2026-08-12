import { Home, Settings, Inbox, Calendar, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "Profile", url: "#", icon: Home, value: "PROFILE" },
  { title: "Reports", url: "#", icon: Inbox, value: "REPORTS" },
  { title: "Appointments", url: "#", icon: Calendar, value: "APPOINTMENTS" },
];

type SideBarType = {
  selected?: string;
  setSelected: (selected: string) => void;
};
export default function SideBar(props: SideBarType) {
  const { setSelected, selected } = props;
  return (
    // <SidebarProvider>
    <Sidebar className="sticky relative h-full mt-4" variant="sidebar">
      {/* <SidebarInset className="min-w-0"> */}
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`${selected === item.value && "bg-blue-200 hover:bg-blue-200!"}`}
            >
              <SidebarMenuButton
                className={
                  "text-sm font-medium px-3 py-2 h-9   hover:bg-blue-200 cursor-pointer"
                }
              >
                <item.icon />
                <span onClick={() => setSelected(item.value)}>
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* </SidebarInset> */}
    </Sidebar>
    // </SidebarProvider>
  );
}
