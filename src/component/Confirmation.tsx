
import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

interface ConfirmationProps {
  name: string;
  bookingDate: string;
  bookingTime: string;
}

const useStyles = makeStyles({
  root: {
    textAlign: 'center',  
    marginTop: '20px',
  },
});

const Confirmation: React.FC<ConfirmationProps> = ({ name, bookingDate, bookingTime }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3">Successfully Booked</Typography>
      <Typography variant="h5">Hi, {name},</Typography>
      <Typography variant="body1">
        Your Booking is Scheduled at {bookingTime} on {bookingDate}.
      </Typography>
      <Typography variant="body1">Thanks!</Typography>
    </div>
  );
};

export default Confirmation;
