import { useState } from 'react';
import bookingValidatorSchema from './../helpers/booking-validator.schema';
import token from './../common/token';

const TicketReservation = ({ airports, setBookings }) => {
  const [booking, setBooking] = useState({
    firstName: '',
    lastName: '',
    departureAirportId: '',
    arrivalAirportId: '',
    departureDate: '',
    returnDate: ''
  });
  const [formError, setFormError] = useState({ msg: '' });

  const handleTicketReservation = (e, placedBooking) => {
    e.preventDefault();

    const formValidity = Object.entries(placedBooking).every(
      ([fieldKey, fieldValue]) => {
        const fieldValidity = bookingValidatorSchema[fieldKey](fieldValue);

        if (fieldValidity === true) {
          return true;
        }

        setFormError(fieldValidity);

        return false;
      }
    );

    if (!formValidity) {
      return;
    }

    fetch(
      `https://vm-fe-interview-task.herokuapp.com/api/bookings/create?authToken=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(placedBooking)
      }
    )
      .then(res => res.json())
      .then(resData => {
        setBookings(bookings => ({
          list: [resData, ...bookings.list],
          totalCount: bookings.totalCount + 1
        }));

        setFormError({ msg: '' });

        return setBooking(booking =>
          Object.keys(booking).reduce((acc, field) => {
            acc[field] = '';

            return acc;
          }, {})
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <header id="hero">
      <div id="ticket-reservation" className="container">
        <form
          className="hero__form"
          onSubmit={e => handleTicketReservation(e, booking)}
        >
          <h1 className="hero__form__heading">
            Book International Flight Tickets Instantly
          </h1>
          {formError.msg && (
            <div className="hero__form__error">&#9888; {formError.msg}</div>
          )}
          <div className="hero__form__fields">
            <div className="hero__form__field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={booking.firstName}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              />
            </div>
            <div className="hero__form__field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={booking.lastName}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              />
            </div>
            <div className="hero__form__field">
              <label htmlFor="departureAirportId">Departure Airport</label>
              <select
                name="departureAirportId"
                id="departureAirportId"
                value={booking.departureAirportId || 'default'}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              >
                <option value="default">please choose</option>
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="hero__form__field">
              <label htmlFor="arrivalAirportId">Arrival Airport</label>
              <select
                name="arrivalAirportId"
                id="arrivalAirportId"
                value={booking.arrivalAirportId || 'default'}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              >
                <option value="default">please choose</option>
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="hero__form__field">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                id="departureDate"
                value={booking.departureDate}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              />
            </div>
            <div className="hero__form__field">
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                name="returnDate"
                id="returnDate"
                value={booking.returnDate}
                onChange={e =>
                  setBooking(booking => ({
                    ...booking,
                    [e.target.name]: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <button type="submit" className="hero__form__button">
            Book It
          </button>
        </form>
      </div>
    </header>
  );
};

export default TicketReservation;
