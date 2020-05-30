import React from 'react';
import {Grid, Form, Header, Message} from 'semantic-ui-react';
import {Helmet} from 'react-helmet';
import store from 'store';
import styles from './styles.css';
import {Link} from 'react-router-dom';
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Page from "../Page";
import axios, {get} from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;
        const {username} = this.state;

        this.setState({error: false});
         const spectator = {
             "Pagination":{
                 "Take":1
             },
            "Filtering":{
            "SearchTerm":username
        }
         }
        axios.post('http://localhost:5000/Spectator/get', spectator)
            .then(({ data:u }) => {
                console.log(u["message"]);
                const mess = JSON.parse(u["message"]);
                const response = mess["Item2"];
                console.log(response);
                const { history } = this.props;
                history.push(`/reservations/${username}`);
            })
            .catch(e => {return this.setState({ error: true })});

        console.log("you're logged in. yay!");
        store.set('loggedIn', true);
        history.push(`/reservations/${username}`);
    }

    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }

    render() {
        const {error} = this.state;

        return (
            <Page title="Reservations">
                <Helmet>
                    <title>Reservations</title>
                </Helmet>
                <Grid>
                    <Helmet>
                        <title>Login</title>
                    </Helmet>

                    <Grid.Column width={6}/>
                    <Grid.Column width={4}>
                        <Form className={styles.loginForm} error={error} onSubmit={this.onSubmit}>
                            <Header as="h1">Login</Header>
                            {error && <Message
                                error={error}
                                content="The username/password is incorrect."
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
                            <Form.Button type="submit">Go!</Form.Button>
                        </Form>
                        <Link to="/register">
                            <Button positive>Register new account</Button>
                        </Link>
                    </Grid.Column>
                </Grid>

            </Page>
        );
    }
}

export default Login;
