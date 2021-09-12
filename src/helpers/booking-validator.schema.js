const bookingValidatorSchema = {
  firstName: value =>
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.trim().length <= 30
      ? true
      : { msg: 'Invalid first name.' },
  lastName: value =>
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.trim().length <= 30
      ? true
      : { msg: 'Invalid last name.' },
  departureAirportId: value =>
    parseInt(value) && value > 0
      ? true
      : { msg: 'Invalid departure airport id.' },
  arrivalAirportId: value =>
    parseInt(value) && value > 0
      ? true
      : { msg: 'Invalid arrival airport id.' },
  departureDate: value =>
    Date.parse(new Date(value)) > Date.now()
      ? true
      : { msg: 'Invalid departure date.' },
  returnDate: value =>
    Date.parse(new Date(value)) > Date.now() + 172.8e5
      ? true
      : { msg: 'Invalid return date.' }
};

export default bookingValidatorSchema;
