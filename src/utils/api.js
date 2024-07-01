const BASE_URL = "https://codebuddy.review";

export const fetchSeatsByCount = (count) =>
  fetch(`${BASE_URL}/seats?count=${count}`).then((response) => response.json());

export const confirmBooking = (seats) =>
  fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seats }),
  }).then((response) => response.json());
