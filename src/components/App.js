import React from 'react';
import GlobalStyles from './GlobalStyles';
import Snackbar from '@material-ui/core/Snackbar';

import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';
import { BookingContext, BookingProvider } from './BookingContext';
import { PurchaseModal } from './PurchaseModal';
import { SuccessfulPurchase } from './SuccessfulPurchase';


function App() {
  const {
    state: { numOfRows },
    action: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

console.log("*****************",React.useContext(BookingContext))

  const {
    action: { clearSnackbar },
    status,
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, [receiveSeatInfoFromServer]);

  return (
    <>
      <GlobalStyles />
        <TicketWidget />
      <PurchaseModal />
      <Snackbar open={status === 'purchased'} severity='success'>
        <SuccessfulPurchase 
          severity='success'
          onClose={() => {if (clearSnackbar !== undefined){clearSnackbar()}}}
          >
          </SuccessfulPurchase>
      </Snackbar>
    </>
  );
}

export default App;
