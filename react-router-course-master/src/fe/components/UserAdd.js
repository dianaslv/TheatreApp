import React from 'react';
import axios, { post } from 'axios';
import UserForm from './UserForm';
import { Helmet } from 'react-helmet';
import Page from './Page';
import Navbar from "./Cms/Navbar";

class UserAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: {}, userId:'',username:'', reservationId:'' };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({username:params.username, userId: params.userId}, ()=>{
            const spectator = {
                "Pagination":{
                    "Take":1
                },
                "Filtering":{
                    "SearchTerm":params.username
                }
            }
            console.log(spectator);
            axios.post('http://localhost:5000/Spectator/get', spectator)
                .then(({ data:u }) => {
                    console.log(u["message"]);
                    const mess = JSON.parse(u["message"]);
                    const response = mess["Item2"][0];
                    console.log(response);
                    this.setState({user:response});
                })
        });
    }

    handleSubmit(user, seatReserved) {
        const { username } = this.state;
        console.log(seatReserved);


        let reservation = {
            "CreatedAt": "2020-05-28T13:36:36.1580148Z",
            "SpectatorId": user.Id,
            "TheatrePlayId":"fe567963-31ee-4fd3-ac2c-53a3e38e4311" ,
            "Address": user.Address,
            "Email": user.Email,
            "Name":user.Name
        };
        axios.post('http://localhost:5000/Reservation', reservation)
            .then(({ data:u }) => {
                console.log(u["message"]);
                const reservationId = u["message"];
                this.setState({reservationId:reservationId},()=>{

                    seatReserved.map(seat=>{

                        let ticket = {
                            "Row": seat.Row,
                            "Section":seat.Section ,
                            "SeatNumber": seat.SeatNumber,
                            "ReservationId": this.state.reservationId,
                            "Price": seat.Price
                        }
                        axios.post('http://localhost:5000/Ticket', ticket)
                            .then(({ data:u }) => {});
                        console.log(u["message"]);
                    })
                    this.setState({ user });

                    console.log('updated:', user);
                    const { history } = this.props;

                    history.push(`/reservations/${username}`);

                });

            })


    }

    handleCancel(e) {
        e.preventDefault();
        const { username } = this.state;

        console.log('you have canceled');
        const {history} = this.props;
        history.push(`/reservations/${username}`);
    }


    render() {
      const {username,user} = this.state;
    return (
      <Page title="Add reservation" columns={3}>
        <Helmet>
          <title>CMS | Add reservation</title>
        </Helmet>
          <Navbar username={username}/>
        <UserForm
            user={user}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Page>
    );
  }
}

export default UserAdd;
