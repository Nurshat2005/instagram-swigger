import LayoutSite from "@/components/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface ILayout{
  children: ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default Layout;
