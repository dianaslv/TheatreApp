import React from 'react';
import { Header } from 'semantic-ui-react';
import Page from '../Page';
import styles from './styles.css';

const FourOhFour = () => (
  <Page>
    <div className={styles.container}>
      <Header as="h1">404</Header>
      <p>Oops! Couldn't find this page!</p>
    </div>
  </Page>
);

export default FourOhFour;
