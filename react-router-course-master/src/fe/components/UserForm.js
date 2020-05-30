import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Prompt} from 'react-router-dom';
import Seats from "./DrawGrid";
import seats from "../../../seats.json";
import DrawGrid from "./DrawGrid";
import {Popup} from 'semantic-ui-react';
import '../index.css';
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const {user = {}} = props;

        this.state = {
            user,
            formChanged: false,
            seat: [],
            seatAvailable: [],
            seatReserved: [], tickets: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSoldTickets = this.getSoldTickets.bind(this);
    }


    getSoldTickets() {
        axios.post('http://localhost:5000/Ticket/get', {})
            .then(({data: u}) => {
                const mess = JSON.parse(u["message"]);
                const result = mess["Item2"];
                console.log(result);
                return result;
            });

    }

    async componentDidMount() {
        let myItems = [];




        await axios.post('http://localhost:5000/Ticket/get', {})
            .then(({data: u}) => {
                const mess = JSON.parse(u["message"]);
                const soldTickets = mess["Item2"];
                console.log(soldTickets);
                seats.map(seat => {
                    let exists = false;
                    soldTickets.map(soldSeat => {
                        if (soldSeat["Row"] === seat["Row"] && soldSeat["Section"] === seat["Section"] && soldSeat["SeatNumber"] === seat["SeatNumber"]) {
                            exists = true;
                        }
                    });
                    if (exists === false) {
                        myItems.push(seat);
                    }
                })
                console.log(myItems);
            });
        this.setState({
            seat: myItems,
            seatAvailable: myItems
        });


    }

    componentWillReceiveProps(nextProps) {
        const {user} = nextProps;
        this.setState({
            user: user,
            seatReserved: []
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const {user, seatReserved} = this.state;
        const {handleSubmit} = this.props;

        let myItems = [];
        this.state.seatAvailable.map((seat, id) => {
            myItems.push({
                Id: seat.Id
            })
        });
        this.state.seatReserved.map((seat, id) => {
            console.log(seat.Id);
        })
        console.log(myItems);
        console.log(this.state.seatReserved);

        console.log(user, seatReserved);

        handleSubmit(user, seatReserved);

        this.setState({user: {}});
    }

    handleChange(e, {name, value}) {
        const {user} = this.state;

        this.setState({user: {...user, [name]: value}, formChanged: true});
    }

    onClickData(seat) {
        if (this.state.seatReserved.indexOf(seat) > -1) {
            this.setState({
                seatAvailable: this.state.seatAvailable.concat(seat),
                seatReserved: this.state.seatReserved.filter(res => res !== seat)
            })
        } else {
            this.setState({
                seatReserved: this.state.seatReserved.concat(seat),
                seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
            })
        }
        console.log(this.state.seatAvailable);
        console.log(this.state.seatReserved);
    }


    render() {
        console.log(this.state.user);
        const {user: {Name, Email, Address}, formChanged, seat, seatAvailable} = this.state;
        const {handleCancel, submitText = 'Create'} = this.props;
        console.log(seat);
        return (
            <div>
                <h1>Seats</h1>
                <DrawGrid
                    seat={this.state.seat}
                    available={this.state.seatAvailable}
                    reserved={this.state.seatReserved}
                    onClickData={this.onClickData.bind(this)}
                />
                <Form onSubmit={this.handleSubmit}>
                    <Prompt when={formChanged} message="are u sure u wanna do that?"/>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="Name"
                        value={Name}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Email"
                        type="email"
                        name="Email"
                        value={Email}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Address"
                        type="text"
                        name="Address"
                        value={Address}
                        onChange={this.handleChange}
                    />
                    <Form.Group>
                        <Form.Button type="submit">{submitText}</Form.Button>
                        <Form.Button onClick={handleCancel}>Cancel</Form.Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default UserForm;

