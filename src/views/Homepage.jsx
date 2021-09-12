import { useState, useEffect } from 'react';
import Navigation from './../components/Navigation';
import TicketReservation from './../components/TicketReservation';
import UserReservations from './../components/UserReservations';
import Footer from './../components/Footer';
import token from './../common/token';
import paginationSettings from './../common/pagination-settings';

const Homepage = () => {
  const [airports, setAirports] = useState([]);
  const [bookings, setBookings] = useState({ list: [], totalCount: 0 });
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('https://vm-fe-interview-task.herokuapp.com/api/airports')
      .then(res => res.json())
      .then(resData => setAirports(resData))
      .catch(err => console.error(err));
  }, []);

  /* when placed in the dependency array - 'bookings.list.length' causes infinite component rerendering */
  /* eslint "react-hooks/exhaustive-deps": "off" */
  useEffect(() => {
    fetch(
      `https://vm-fe-interview-task.herokuapp.com/api/bookings?authToken=${token}&pageIndex=${page}&pageSize=${paginationSettings.pageSize}`
    )
      .then(res => res.json())
      .then(resData => {
        if (!bookings.list.length) {
          return setBookings(resData);
        }

        return setBookings(existingBookings => ({
          list: [...existingBookings.list, ...resData.list],
          totalCount: existingBookings.totalCount
        }));
      })
      .catch(err => console.error(err));
  }, [page]);

  /* this is so lame, but I haven't learned Intersection Observer API yet */
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      page * paginationSettings.pageSize < bookings.list.length
    ) {
      return setPage(page => page + 1);
    }
  };

  return (
    <>
      <Navigation />
      <TicketReservation airports={airports} setBookings={setBookings} />
      <UserReservations
        airports={airports}
        bookings={bookings}
        setBookings={setBookings}
      />
      <Footer />
    </>
  );
};

export default Homepage;
