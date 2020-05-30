import * as React from "react";
import {Popup} from 'semantic-ui-react';
import '../index.css';
export default class DrawGrid extends React.Component {
    render() {
        return (
            <div className="container">
                <table className="grid">
                    <tbody>
                    {this.props.seat.map(row => {
                            let content = "place" + row.Section.toString() + "-" + row.Row.toString()+ "-" + row.SeatNumber.toString();
                            let price = row.Price + " lei";
                            return <tr> <td className={this.props.reserved.indexOf(row) > -1 ? 'reserved' : 'available'}
                                       key={row.Id} onClick={e => this.onClickSeat(row)}>
                                <Popup
                                    content={content}
                                    key={row.Id}
                                    header={price}
                                    trigger={<p>{row.Id}</p>}
                                />
                            </td></tr>
                        })}
                    </tbody>
                </table>

                <AvailableList available={this.props.available}/>
                <ReservedList reserved={this.props.reserved}/>
            </div>
        )
    }

    onClickSeat(seat) {
        this.props.onClickData(seat);
    }
}

class AvailableList extends React.Component {
    render() {
        const seatCount = this.props.available.length;
        return (
            <div className="left">
                <h4>Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})</h4>
                <ul>
                    {this.props.available.map(res => <li key={res.Id}>{res.Id}</li>)}
                </ul>
            </div>
        )
    }
}

class ReservedList extends React.Component {
    render() {
        return (
            <div className="right">
                <h4>Reserved Seats: ({this.props.reserved.length})</h4>
                <ul>
                    {this.props.reserved.map(res => <li key={res.Id}>{res.Id}</li>)}
                </ul>

            </div>
        )
    }
}
