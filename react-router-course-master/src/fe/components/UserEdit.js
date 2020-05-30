import React from 'react';
import axios, {get, patch} from 'axios';
import {Helmet} from 'react-helmet';
import UserForm from './UserForm';
import Page from './Page';
import Navbar from "./Cms/Navbar";

import regeneratorRuntime from "regenerator-runtime";
class UserEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user: {}, userId: '', username: '', reservationId: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        const {match: {params}} = this.props;
        let searchBody = {"Filtering": {"SearchTerm": "08d80278-25ca-4b99-84ac-c3d506086ade"}};
    /*    await axios.post('http://localhost:5000/Ticket/get', searchBody)
            .then(({data: u}) => {
                console.log(u["message"]);
                const mess = JSON.parse(u["message"]);
                const response = mess["Item2"];
                console.log(response);
                this.setState({tickets: response}, () => {
                    this.state.tickets.map(ticket => {
                        console.log("\"" + ticket.Id + "\"");
                        let id = "\"" + ticket.Id + "\"";
                        console.log(id);
                        axios.delete(`http://localhost:5000/Ticket/?id=${ticket.Id}`)
                            .then(({data: u}) => {
                                console.log(u["message"]);
                            });
                    });
                });
            });
*/
        this.setState({username: params.username, userId: params.userId});
        console.log(params.userId);
        const spectator = {
            "Pagination": {
                "Take": 1
            },
            "Filtering": {
                "SearchTerm": params.username
            }
        }
        console.log(spectator);
        await axios.post('http://localhost:5000/Spectator/get', spectator)
            .then(({data: u}) => {
                console.log(u["message"]);
                const mess = JSON.parse(u["message"]);
                const response = mess["Item2"][0];
                console.log(response);
                this.setState({user: response});
            });


    }


handleSubmit(user, seatReserved)
{
    const {username} = this.state;
    console.log(seatReserved);


    let reservation = [{
        "Id": this.state.userId,
        "CreatedAt": "2020-05-28T13:36:36.1580148Z",
        "SpectatorId": user.Id,
        "TheatrePlayId": "fe567963-31ee-4fd3-ac2c-53a3e38e4311",
        "Address": user.Address,
        "Email": user.Email,
        "Name": user.Name
    }];
    axios.put('http://localhost:5000/Reservation', reservation)
        .then(({data: u}) => {
            console.log(u["message"]);

                seatReserved.map(seat => {

                    let ticket = {
                        "Row": seat.Row,
                        "Section": seat.Section,
                        "SeatNumber": seat.SeatNumber,
                        "ReservationId": this.state.userId,
                        "Price": seat.Price
                    }
                    axios.post('http://localhost:5000/Ticket', ticket)
                        .then(({data: u}) => {
                        });
                    console.log(u["message"]);
                })
                this.setState({user});

                console.log('updated:', user);
                const {history} = this.props;

                history.push(`/reservations/${username}`);

            });




}

handleCancel(e)
{
    e.preventDefault();
    const {username} = this.state;

    console.log('you have canceled');
    const {history} = this.props;
    history.push(`/reservations/${username}`);
}

render()
{
    const {user, username} = this.state;
    console.log(user);
    return (
        <Page title="Edit reservation" columns={3}>
            <Helmet>
                <title>Reservation </title>
            </Helmet>
            <Navbar username={username}/>
            <UserForm
                user={user}
                submitText="Update"
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
            />
        </Page>
    );
}
}

export default UserEdit;
