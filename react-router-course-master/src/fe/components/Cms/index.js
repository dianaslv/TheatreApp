import React from 'react';
import { Helmet } from 'react-helmet';
import { Route,  Switch } from 'react-router-dom';
import styles from './styles.css';
import Users from '../Users';
import UserAdd from '../UserAdd';
import UserEdit from '../UserEdit';
import FourOhFour from '../FourOhFour';


export default class Cms extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>CMS</title>
                </Helmet>
                <div className={styles.mainBody}>
                    <Switch>
                        <Route path="/reservations/:username/:userId/edit" component={UserEdit} />
                        <Route path="/reservations/:username/new" component={UserAdd} />
                        <Route path="/reservations/:username" component={Users} />
                        <Route component={FourOhFour} />
                    </Switch>
                </div>
            </div>
        );
    }
}
