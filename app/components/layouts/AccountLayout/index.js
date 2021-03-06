import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_LINKS } from '../../../data/links';
import { LANGS } from '../../../data/main';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import {
  getDetails,
  showAuthLoading,
  getScoreboard
} from '../../../store/actions/Auth';
import Button from '../../elements/Button';
import Dropdown from '../../elements/Dropdown';
import MobileMenu from '../../modules/MobileMenu';
import Sidebar from '../../modules/Sidebar';
import Spinner from '../../elements/Spinner';
import styles from './AccountLayout.module.scss';

const AccountLayout = ({
  children,
  translate,
  getDetails,
  getScoreboard,
  showAuthLoading,
  loading,
  details,
  name
}) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  // Get window width
  const { width } = useWindowDimensions();

  useEffect(() => {
    // Get user details and scoreboard
    showAuthLoading();
    getDetails();
    getScoreboard();
  }, []);

  return (
    <>
      <header
        className={[
          styles.accountHeader,
          isToggleOn && width <= 992 ? styles.mobileActive : ''
        ].join(' ')}
      >
        <div className={styles.leftWrapper}>
          <Link href="/">
            <a>
              <img className={styles.logo} src="/logo-dark.svg" />
            </a>
          </Link>
          <div className={styles.dropdown}>
            <Dropdown items={LANGS} lang />
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <div className={styles.buttons}>
            <Link href="/game">
              <a>
                <Button icon="play-cards" type="white" small>
                  {translate('play')}
                </Button>
              </a>
            </Link>
            <div className={styles.dropdown}>
              <Dropdown
                name={
                  name || (details ? details[0].Username.split(' ')[0] : '')
                }
                img="avatar"
                items={ACCOUNT_LINKS}
                translate={translate}
              />
            </div>
          </div>
          <div className={styles.mobileButton}>
            <Button
              clicked={() => setIsToggleOn((prevState) => !prevState)}
              type="white"
              style={{ border: 'none' }}
            >
              <div className={styles.user}>
                <img src="/img/avatar.png" />
                <span>
                  {name || (details ? details[0].Username.split(' ')[0] : '')}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        show={width <= 992}
        onClose={() => setIsToggleOn(false)}
        isActive={isToggleOn}
        translate={translate}
        isAccount
      />
      <Sidebar show={width > 992} translate={translate} />
      <main className={styles.accountContent}>
        {loading ? <Spinner /> : children}
      </main>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { details, loading } = auth;
  return { details, loading };
};

export default connect(mapStateToProps, {
  getDetails,
  getScoreboard,
  showAuthLoading
})(AccountLayout);
