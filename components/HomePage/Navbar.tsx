import Link from "next/link";
import { Button } from "../ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { createSlug } from "@/utils/create-slug";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const user = await getCurrentUser();
  const urlProfileUser = createSlug(user?.perfil || "/login");

  const navItems = [
    { label: "Início", href: "/#start" },
    { label: "Como funciona?", href: "/#howToWork" },
    { label: "Cidades", href: "/#cities" },
    { label: "Comece agora!", href: "/#callToAction" },
    { label: "Dashboard", href: urlProfileUser },
  ];

  return <NavbarClient user={user} navItems={navItems} urlProfileUser={urlProfileUser} />;
}
