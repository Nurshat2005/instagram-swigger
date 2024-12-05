'use client';
import styles from './SignIn.module.scss';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignInMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';

interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignIn>();
  const [signIn] = useSignInMutation();
 const onSubmit: SubmitHandler<ISignIn> = async (data) => {
   try {
     // Пытаемся выполнить вход, передавая данные пользователя
     const result = await signIn(data).unwrap();

     // Если вход успешен, сохраняем токены в localStorage
     localStorage.setItem('tokens', JSON.stringify(result));

     // Перенаправляем пользователя на главную страницу
     router.push('/');
   } catch (error) {
     console.error('Ошибка при входе:', error);

     const errorMessage = (error as any).data?.message || 'Неизвестная ошибка';

     alert(`Ошибка при входе: ${errorMessage}`);
   }
 };


  return (
    <div className={styles.SignIn}>
      <div className={styles.content}>
        <h1 className={styles.instagramLogo}>Instagram</h1>
        <h2 className={styles.title}>Вход в аккаунт</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="email"
              id="username"
              placeholder="Введите имя пользователя"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              {...register('password', { required: true })}
            />
          </div>

          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </form>

        <div className={styles.additionalLinks}>
          <a href="#" className={styles.link}>
            Забыли пароль?
          </a>
        </div>

        <div className={styles.registerText}>
          У вас ещё нет аккаунта?
          <Link href="sign-up" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>

        <div className={styles.appLinks}>
          <p>Установите приложение.</p>
          <a href="#" className={styles.storeLink}>
            Скачать из App Store
          </a>
          <a href="#" className={styles.storeLink}>
            Скачать из Google Play
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
