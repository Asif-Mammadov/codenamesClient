import React from 'react';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import Button from '../../elements/Button';
import FormGroup from '../../elements/FormGroup';

import styles from './Account.module.scss';

const Account = () => {
  // Make sure ids that get generated on the server match that of the browser
  resetIdCounter();

  return (
    <Tabs className={styles.tabs}>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Account Details
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          Reset Password
        </Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <FormGroup
          name="fullname"
          label="Full Name"
          type="text"
          placeholder="Eyvaz Ahmadzada"
          icon="user"
          style={{ marginBottom: 24 }}
        />
        <FormGroup
          name="email"
          label="Email"
          type="email"
          placeholder="eyvaz.ahmedzade.12@gmail.com"
          icon="envelope"
          style={{ marginBottom: 24 }}
        />
        <Button small>Save</Button>
      </TabPanel>
      <TabPanel className={styles.tabPanel}>
        <FormGroup
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="Password"
          icon="lock"
          style={{ marginBottom: 24 }}
        />
        <FormGroup
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Password"
          icon="lock"
          style={{ marginBottom: 24 }}
        />
        <Button small>Save</Button>
      </TabPanel>
    </Tabs>
  );
};

export default Account;
