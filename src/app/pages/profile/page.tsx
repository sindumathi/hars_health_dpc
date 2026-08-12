"use client";
import { useState } from "react";
import UserProfile from "@/src/components/registration/UserProfile";
import Records from "@/src/components/NavComponents/Records";
import Appointments from "@/src/components/NavComponents/Appointment";
import SideBar from "@/src/components/uiComponents/SideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function Profile() {
  const [selected, setSelected] = useState("PROFILE");
  return (
    <SidebarProvider className="gap-3">
      <SideBar selected={selected} setSelected={setSelected} />
      <SidebarInset className="flex-1 mt-1">
        {selected === "PROFILE" && <UserProfile />}
        {selected === "REPORTS" && <Records />}
        {selected === "APPOINTMENTS" && <Appointments />}
      </SidebarInset>
    </SidebarProvider>
  );
}
