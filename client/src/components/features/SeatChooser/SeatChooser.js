import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeats, getRequests, loadSeatsRequest } from '../../../redux/seatsRedux';
import './SeatChooser.scss';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
    const dispatch = useDispatch();
    const seats = useSelector(getSeats);
    console.log(seats);
    const requests = useSelector(getRequests);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(process.env.PORT || "http://localhost:8000/");
        dispatch(loadSeatsRequest());
        newSocket.on('seatsUpdated', (seatsData) => dispatch(loadSeats(seatsData)))
        setSocket(newSocket);
    }, [dispatch]);

    // Function to check if a seat is already taken
    const isTaken = (seatId) => {
        return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
    }

    // Function to render seat buttons based on their availability
    const prepareSeat = (seatId) => {
        if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
        else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
        else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
    }

    // Counting taken and free seats
    const SEATS_NUMBERS = 50;
    const takenSeats = seats.filter(seat => seat.day === chosenDay).length;
    const freeSeats = SEATS_NUMBERS - takenSeats;

    return (
        <div>
            <h3>Pick a seat</h3>
            <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
            <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
            { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(SEATS_NUMBERS)].map((x, i) => prepareSeat(i+1) )}</div>}
            { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={SEATS_NUMBERS} /> }
            { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
            <p>Free seats: {freeSeats}/{SEATS_NUMBERS}</p>
        </div>
    )
}

export default SeatChooser;