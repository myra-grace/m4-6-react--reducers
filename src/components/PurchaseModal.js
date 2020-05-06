import React from 'react';
import styled from 'styled-components';

import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';
import { Dialog } from '@material-ui/core';
import { decodeSeatId } from '../helpers';


export const PurchaseModal = () => {
    const {
        selectedSeatId,
        status,
        error,
        price,
        action: {
            beginBookingProcess,
            cancelBookingProcess,
        }
    } = React.useContext(BookingContext);

    const {
        action: {  },
    } = React.useContext(SeatContext);

    const [creditCard, setCreditCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');
    const { rowName, seatNum } = decodeSeatId(selectedSeatId);

    return (
      <>
        <h1>Purchase Ticket</h1>
        <Dialog
            open={selectedSeatId !== null}
            >

        </Dialog>
      </>
    )
}