import React from "react";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function NavbarLayout() {
  return (
    <Navbar maxWidth="lg" shouldHideOnScroll isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Mining Mine Bot</p>
      </NavbarBrand>
      <NavbarContent></NavbarContent>
    </Navbar>
  )
}