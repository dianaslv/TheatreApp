import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const handleLogout = (history) => () => {
    history.push(`/login`)
};

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        const { username = ''}  = props;
        this.state= { username: username};
        console.log(this.state.username);
    }

    componentWillReceiveProps(nextProps) {
        const { username } = nextProps;

        this.setState({ username });
    }


    render() {
        const {username} = this.state;
        return (
            <div>
                <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
                    <Link to={`/reservations/${username}/new`}>
                            <Menu.Item name="new-user">
                                <Icon name="plus" />
                                Add reservation
                            </Menu.Item>
                        </Link>
                    <Link to={`/reservations/${username}`}>
                        <Menu.Item name="reservations">
                            <Icon name="folder" />
                             All reservations
                        </Menu.Item>
                    </Link>
                    <Link to={`/login`}>
                    <Menu.Item name="logout" onClick={handleLogout(history)}>
                        <Icon name="power" />
                        Logout
                    </Menu.Item>
                    </Link>
                </Sidebar>
            </div>
        );
    }
}
