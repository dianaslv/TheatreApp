import React from 'react';
import {Button, Image, Modal, Table} from 'semantic-ui-react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user: {}, reservations: [], userId: '', username: ''};

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        this.setState({username: params.username, userId: params.userId}, () => {
                const tickets = {
                    "Filtering": {
                        "SearchTerm": params.userId
                    }
                }
                console.log(tickets);

                axios.post('http://localhost:5000/Ticket/get', tickets)
                    .then(({data: u}) => {
                        const mess = JSON.parse(u["message"]);
                        const result = mess["Item2"];
                        console.log(result);
                        this.setState({reservations: result});
                        console.log(this.state.reservations);
                    });

            }
        );
        axios.get(`/api/users/${params.userId}`)
            .then(({data: user}) => {
                console.log(user);
                this.setState({user});
            });
    }

    handleDelete() {
        const {match: {params}, history, handleDelete} = this.props;
        const {username} = this.state;
        axios.delete(`http://localhost:5000/Reservation/?id=${params.userId}`)
            .then(({data: u}) => {
                console.log(u["message"]);
                history.push(`/reservations/${username}`);
            });
    }

    render() {
        const {user, userId, username, reservations} = this.state;

        return (
            <Modal open dimmer="blurring">
                <Helmet>
                    <title>{userId}</title>
                </Helmet>

                <Modal.Header>No of Tickets : {Object.keys(reservations).length}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="small" src={`https://api.adorable.io/avatars/250/${user.email}`}/>
                    <Modal.Description>
                        {reservations.map(ticket =>
                            (<div>
                                    <h4>{ticket.Id}</h4>
                                    <p>Section: {ticket.Section}</p>
                                    <p>Row: {ticket.Row}</p>
                                    <p>SeatNumber: {ticket.SeatNumber}</p>
                                    <p>Price: {ticket.Price}</p>
                                    <p></p>
                                </div>
                            ),
                        )}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Link to={`/reservations/${username}/${userId}/edit`}>
                        <Button positive>Edit</Button>
                    </Link>
                    <Button negative onClick={this.handleDelete}>Delete</Button>
                    <Link to={`/reservations/${username}`}>
                        <Button>Close</Button>
                    </Link>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default UserInfo;
