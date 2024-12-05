'use client';
import Link from 'next/link';
import scss from './Header.module.scss';

const Header = () => {
  return (
    <div className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <Link href={'/'}>Home</Link>
          <Link href={'/sign-in'}>Вход</Link>
          <Link href={'/sign-up'}>Регистрация</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
