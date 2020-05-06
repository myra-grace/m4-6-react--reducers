import React from 'react';

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numRows: 0,
    seatsPerRow: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case 'receive-seat-info-from-server': {
            return {
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatPerRow: action.seatsPerRow,
            };
        }

        case 'mark-seat-as-purchased': {
            return {
                ...state,
                hasLoaded: true,
                seats: {
                    ...state.seats,
                    [action.seatId]: {
                        ...state.seat[action.seatId],
                        isBooked: true,
                    },
                },
            };
        }

        default:
            throw new Error(`unrecognized action: ${action.type}`);
    }
};

export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = React.useCallback(
        data =>
            dispatch({
                type: 'receive-seat-info-from-server',
                ...data,
            }),
        [dispatch]
    );

    const markSeatAsPurchased = React.useCallback(
        seatId =>
            dispatch({
                type: 'mark-seat-as-purchased',
                seatId,
            }),
        [dispatch]
    );

    return (
        <SeatContext.Provider
        value={{
            state,
            action: {
                receiveSeatInfoFromServer,
                markSeatAsPurchased,
            },
        }}
        >
            {children}
            </SeatContext.Provider>
    );
};