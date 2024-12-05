'use client';
import { FC, ReactNode, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetMeQuery } from '@/redux/api/auth';

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = useCallback(async () => {
    const tokens = localStorage.getItem('tokens'); // Получаем токены из localStorage
    if (!tokens || tokens === 'undefined') {
      localStorage.removeItem('tokens'); // Удаляем токены, если они отсутствуют
      return; // Выходим, так как токены отсутствуют
    }

    let localStorageData;
    try {
      localStorageData = JSON.parse(tokens); // Парсим токены
    } catch (error) {
      console.error('Failed to parse tokens:', error); // Логируем ошибку парсинга
      localStorage.removeItem('tokens'); // Удаляем некорректные токены
      return; // Выходим, так как парсинг не удался
    }

    // Продолжайте с использованием localStorageData
    const { accessTokenExpiration, refreshToken } = localStorageData;
    if (accessTokenExpiration < new Date().getTime()) {
      localStorage.removeItem('tokens');
      const { data } = await refreshTokenMutation({ refreshToken });
      localStorage.setItem('tokens', JSON.stringify(data));
      window.location.reload();
    } else {
      console.log('refreshToken живой!');
    }
  }, []);

  const handleNavigation = useCallback(() => {
    switch (pathname) {
      case '/sign-in':
      case '/sign-up':
        if (status === 'fulfilled') {
          router.push('/');
        }
        break;
      case '/':
        if (status === 'rejected') {
          router.push('/sign-in');
        }
        break;
      default:
        break;
    }
  }, [pathname, status, router]);

  useEffect(() => {
    handleRefreshToken();
  }, [handleRefreshToken]);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, handleNavigation]);

  return <>{children}</>; // Оборачиваем children в React.Fragment
};
