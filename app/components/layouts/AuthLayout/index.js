import Link from 'next/link';
import React from 'react';
import Fade from 'react-reveal/Fade';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Header from '../../modules/Header';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ isLogin, children, submitted }) => {
  // Get window width
  const { width } = useWindowDimensions();

  return (
    <>
      <Header logoDark={width <= 992} togglerDark />

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
              {children}

              {/* Bottom link */}
              <div className={styles.bottomLink}>
                <span>
                  {isLogin
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                </span>
                <Link href={isLogin ? '/register' : '/login'}>
                  <a>{isLogin ? 'Sign Up' : 'Sign In'}</a>
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
