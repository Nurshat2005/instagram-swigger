'use client';
import scss from './SignUp.module.scss';
import apple from '@/components/assets/app-store.png';
import play from '@/components/assets/play-market.png';
import { useGetMeQuery, useSignInMutation } from '@/redux/api/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillFacebook } from 'react-icons/ai';

interface ISignUp {
  email: string;
  password: string;
  username: string;
  photo: string;
}
const SignUp = () => {
  const { data } = useGetMeQuery();
  console.log(data);
  const [signUp] = useSignInMutation();
  const { register, handleSubmit, reset } = useForm<ISignUp>();
  const router = useRouter();
  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    try {
      const result = await signUp(data).unwrap();
      localStorage.setItem('tokens', JSON.stringify(result));
      router.push('/');
      reset();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось зарегистрироваться. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className={scss.signUp}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.instagram}>
            <h1>Instagram</h1>
            <h2 className={scss.title}>
              Зарегистрируйтесь, чтобы <br /> смотреть фото и видео ваших <br /> друзей.
            </h2>
            <button>
              <AiFillFacebook className={scss.facebook} />
              Войти через Facebook
            </button>
            <div className={scss.hrText}>
              <div className={scss.line}></div>
              <span> или</span>
              <div className={scss.line}></div>
            </div>
            <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Мобильный телефон или email"
                className={scss.input}
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              <input
                type="text"
                placeholder="Имя и фамилия"
                className={scss.input}
                {...register('username', { required: true })}
              />
              <input
                type="text"
                placeholder="Url пользователя"
                className={scss.input}
                {...register('photo', { required: true })}
              />
              <input
                type="password"
                placeholder="Пароль"
                className={scss.input}
                {...register('password', { required: true })}
              />
              <div className={scss.policyText}>
                <p className={scss.text1}>
                  Люди, которые пользуются нашим <br /> сервисом, могли загрузить вашу контактную{' '}
                  <br />
                  информацию в Instagram. <span>Подробнее</span>
                </p>
                Регистрируясь, вы принимаете наши <br />
                <a href="#" className={scss.link}>
                  Условия
                </a>
                ,
                <a href="#" className={scss.link}>
                  Политику конфиденциальности
                </a>{' '}
                и <br />
                <a href="#" className={scss.link}>
                  Политику в отношении файлов cookie
                </a>
                .
              </div>
              <button type="submit" className={scss.registerButton}>
                Зарегистрироваться
              </button>
            </form>
          </div>
          <div className={scss.loginPrompt}>
            Есть аккаунт?{' '}
            <Link href="/sign-in" className={scss.link}>
              Вход
            </Link>
          </div>
          <div className={scss.downloadApp}>
            <p>Установите приложение.</p>
            <div className={scss.appLinks}>
              <Image className={scss.image} src={apple} alt="App Store" />
              <Image className={scss.image} src={play} alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
