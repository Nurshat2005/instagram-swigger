'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import scss from './LayoutSite.module.scss';
import { usePathname } from 'next/navigation';

interface ILayoutSite {
  children: ReactNode;
}
const LayoutSite: FC<ILayoutSite> = ({ children }) => {
  const [linkName, setLinkName] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    switch (pathName) {
      case '/sign-in':
      case '/sign-up':
        setLinkName(true);
        break;
      default:
        setLinkName(false);
        break;
    }
  }, [pathName]);
  return (
    <div className={scss.LayoutSite}>
      {!linkName && <Header />}
      <main>{children}</main>
      {!linkName && <Footer />}
    </div>
  );
};

export default LayoutSite;
