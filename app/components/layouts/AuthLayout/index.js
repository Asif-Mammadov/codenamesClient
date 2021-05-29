import Link from 'next/link';
import React from 'react';
import Fade from 'react-reveal/Fade';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import FormError from '../../elements/FormError';
import Header from '../../modules/Header';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children, translate, isLogin, submitted, error }) => {
  // Get window width
  const { width } = useWindowDimensions();

  return (
    <>
      <Header logoDark={width <= 992} togglerDark translate={translate} />

      <main className={styles.authContainer}>
        {/* Left part in desktop */}
        <section
          className={[
            styles.pageBg,
            isLogin ? styles.login : styles.register
          ].join(' ')}
        ></section>

        <Fade bottom>
          {/* Login form */}
          <section className={styles.formWrapper}>
            <h2>
              enjoy <span>codenames</span>
            </h2>
            <form onSubmit={submitted}>
              <FormError error={translate(error)} />

              {children}

              {/* Bottom link */}
              <div className={styles.bottomLink}>
                <span>
                  {translate(isLogin ? 'no_account' : 'have_account')}
                </span>
                <Link href={isLogin ? '/register' : '/login'}>
                  <a> {translate(isLogin ? 'register' : 'login')}</a>
                </Link>
              </div>
            </form>
          </section>
        </Fade>
      </main>
    </>
  );
};

export default AuthLayout;
