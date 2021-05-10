import Link from 'next/link';
import React from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Header from '../../modules/Header';
import styles from './Auth.module.scss';

const Auth = ({ isLogin, children }) => {
  // Get window width
  const { width } = useWindowDimensions();

  return (
    <>
      <Header logoDark={width <= 992} togglerDark />
      <main>
        <div className={styles.authContainer}>
          {/* Left part in desktop */}
          <section
            className={[
              styles.pageBg,
              isLogin ? styles.login : styles.register
            ].join(' ')}
          ></section>

          {/* Login form */}
          <section className={styles.formWrapper}>
            <h2>
              enjoy <span>codenames</span>
            </h2>
            <form>
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
        </div>
      </main>
    </>
  );
};

export default Auth;
