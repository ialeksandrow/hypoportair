import token from './../common/token';

const UserReservations = ({ airports, bookings, setBookings }) => {
  const handleReservationDelete = bookingId => {
    fetch(
      `https://vm-fe-interview-task.herokuapp.com/api/bookings/delete/${bookingId}?authToken=${token}`,
      {
        method: 'DELETE'
      }
    )
      .then(res => {
        if (res.ok) {
          return setBookings(bookings => ({
            list: bookings.list.filter(booking => booking.id !== bookingId),
            totalCount: bookings.totalCount - 1
          }));
        }

        throw new Error('Something went wrong.');
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="reservations">
      <div id="reservations" className="container">
        <div className="reservations__block">
          {bookings && (
            <h2
              className="reservations__heading"
              data-reservations-count={bookings.totalCount}
            >
              My Bookings
            </h2>
          )}
          {airports && bookings.list && !!bookings.list.length && (
            <div className="reservations__view">
              {bookings.list.map(booking => (
                <div key={booking.id} className="reservations__tracker">
                  <div className="reservations__tracker__top">
                    <div className="reservations__tracker__top__user">
                      {booking.firstName} {booking.lastName}
                    </div>
                    <div
                      className="reservations__tracker__top__action"
                      onClick={() => handleReservationDelete(booking.id)}
                    >
                      &#10006;
                    </div>
                  </div>
                  <div className="reservations__tracker__body">
                    <div className="reservations__tracker__body__item">
                      <span>
                        {
                          new Date(booking.departureDate)
                            .toLocaleString('en-GB')
                            .split(',')[0]
                        }
                      </span>
                      <span>
                        &#9992; [
                        {
                          airports.filter(
                            airport => airport.id === booking.departureAirportId
                          )[0]?.code
                        }
                        ]
                      </span>
                    </div>
                    <div className="reservations__tracker__body__item">
                      <span></span>
                      <span>ID: {booking.id}</span>
                    </div>
                    <div className="reservations__tracker__body__item">
                      <span>
                        {
                          new Date(booking.returnDate)
                            .toLocaleString('en-GB')
                            .split(',')[0]
                        }
                      </span>
                      <span>
                        &#9992; [
                        {
                          airports.filter(
                            airport => airport.id === booking.arrivalAirportId
                          )[0]?.code
                        }
                        ]
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserReservations;
