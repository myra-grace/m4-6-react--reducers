import React from 'react';
export const BookingContext = React.createContext();

const initialState = {
    status: 'idle',
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: 'seat-selected',
                selectedSeatId: action.seatId,
                price: action.price,
            };
        }

        case 'cancel-booking-process': {
            return {
                ...state,
                status: 'idle',
                selectedSeatId: null,
                price: null,
            };
        }

        case 'purchase-ticket-request': {
            return {
                ...state,
                status: 'awaiting-response',
                error: null,
            };
        }

        case 'purchase-ticket-failure': {
            return {
                ...state,
                status: 'error',
                error: action.message,
            };
        }

        case 'purchase-ticket-success': {
            return {
                ...state,
                status: 'purchased',
                selectedSeatId: null,
                price: null,
                error: null,
            };
        }

        case 'clear-snackbar': {
            return {
                ...state,
                status: 'idle',
            };
        }
    
        default:
            throw new Error(`unrecognized action: ${action.type}`);
    }
};

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = React.useCallback(({seatId, price}) => 
        dispatch({type: 'begin-booking-process', seatId, price}),
        [dispatch]
    );

    const cancelBookingProcess = React.useCallback(() => 
        dispatch({type: 'cancel-booking-process'}),
        [dispatch]
    );

    const purchaseTicketRequest = React.useCallback(() => 
        dispatch({type: 'purchase-ticket-request'}),
        [dispatch]
    );

    const purchaseTicketSuccess = React.useCallback(() => 
        dispatch({type: 'purchase-ticket-success'}),
        [dispatch]
    );

    const purchaseTicketFailure = React.useCallback(() => 
        dispatch({type: 'purchase-ticket-failure'}),
        [dispatch]
    );

    const clearSnackbar = React.useCallback(() => 
        dispatch({type: 'clear-snackbar'}),
        [dispatch]
    );

    return (
        <BookingContext.Provider
            value={{
                ...state,
                action: {
                    beginBookingProcess,
                    cancelBookingProcess,
                    purchaseTicketRequest,
                    purchaseTicketSuccess,
                    purchaseTicketFailure,
                    clearSnackbar,
                },
            }}
        >

            {children}
        </BookingContext.Provider>
    )
}