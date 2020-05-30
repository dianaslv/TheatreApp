import React from 'react';
import { Grid, Form, Header, Message } from 'semantic-ui-react';
import styles from './styles.css';
import { Helmet } from 'react-helmet';
import Page from "../Page";
import axios from "axios";


class UserRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user:{
            username: '',
            password: '',
            name:'',
            phone:'',
            address:'',
            city:'',
            zip:''},
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;
        const {user:{username}} = this.state;

        this.setState({error: false});

        axios.post('/register', this.state).then(res => {
                console.log(res.data);
            }
        ).catch(e => {return this.setState({ error: true })});
        alert(`congrats ${username}! you created a new account. you will be now redirected to the login page to log in`);
        console.log("account created");
        history.push(`/login`);
    }

    handleChange(e, {name, value}) {
        const { user } = this.state;

        this.setState({ user: { ...user, [name]: value } });
    }

    render() {
        const {error} = this.state;

        return (
            <Page title="Register User">
                <Helmet>
                    <title>Register New User</title>
                </Helmet>
                <Grid>
                    <Helmet>
                        <title>Register account</title>
                    </Helmet>

                    <Grid.Column width={6}/>
                    <Grid.Column width={4}>
                        <Form className={styles.loginForm} error={error} onSubmit={this.onSubmit}>
                            <Header as="h1">Register account</Header>
                            {error && <Message
                                error={error}
                                content="This username already exists."
                            />}
                            <Form.Input
                                inline
                                label="Username"
                                name="username"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="Password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="Name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="Phone"
                                name="phone"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="Address"
                                name="address"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="City"
                                name="city"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                inline
                                label="Zip"
                                name="zip"
                                onChange={this.handleChange}
                            />

                            <Form.Button type="submit">Register account</Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Page>
        );
    }
}

export default UserRegister;
