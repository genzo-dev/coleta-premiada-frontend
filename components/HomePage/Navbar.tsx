import { getCurrentUser } from "@/lib/auth/get-current-user";
import { createSlug } from "@/utils/create-slug";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const user = await getCurrentUser();
  const urlProfileUser = createSlug(user?.perfil || "");

  const navItems = [
    { label: "Início", href: "/#start" },
    { label: "Como funciona?", href: "/#howToWork" },
    { label: "Cidades", href: "/#cities" },
    { label: "Comece agora!", href: "/#callToAction" },
  ];

  return (
    <NavbarClient
      user={user}
      navItems={navItems}
      urlProfileUser={urlProfileUser}
    />
  );
}
