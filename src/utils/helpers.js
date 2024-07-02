export const calculateSeatPrice = (rowNumber) => 20 + rowNumber * 10; // rowNumber is 1-based

export const addSeatPrice = (seatRows) => {
  return seatRows.map((row, index) => ({
    ...row,
    pricePerSeat: calculateSeatPrice(seatRows.length - index),
    seats: row.seats.map((seat) => ({
      ...seat,
      pricePerSeat: calculateSeatPrice(seatRows.length - index),
    })),
  }));
};
