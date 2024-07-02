const BASE_URL = "https://codebuddy.review";

export const fetchSeatsByCount = (count) =>
  fetch(`${BASE_URL}/seats?count=${count}`).then((response) => response.json());

export const confirmBooking = (seatIds) =>
  fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedSeatIds: seatIds }),
  }).then((response) => response.json());
