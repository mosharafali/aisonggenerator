"use server";

import Image from "next/image";
import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Credits } from "./credits";
import SidebarMenuItems from "./sidebar-menu-items";
import { User } from "lucide-react";
import Upgrade from "./upgrade";
import Link from "next/link";

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary mt-4 mb-12 flex flex-col items-start justify-start px-2">
            {/* ✅ Logo */}
            <div className="mb-4">
              <Link href={"/"}>
                <Image
                  src="/logo.png" // place logo inside /public/logo.png
                  alt="AI Music Generator Logo"
                  width={30}
                  height={30}
                  priority
                />
              </Link>
            </div>

            {/* ✅ Title */}
            <p className="text-3xl font-black tracking-widest uppercase">
              AI Music
            </p>
            <p className="text-lg"></p>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mb-2 flex w-full items-center justify-center gap-1 text-xs">
          <Credits />
          <Upgrade />
        </div>
        <UserButton
          variant="outline"
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/customer-portal",
              icon: <User />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
