import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Grid, TextField } from '@material-ui/core';
import { BookingDetailsFormData } from '../types'; 
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


interface BookingDetailsProps {
  onBook: (data: BookingDetailsFormData) => void; // Accepts data argument
}

const schema = yup.object().shape({
  appointmentDate: yup.string().required('Appointment Date is required'),
  appointmentTime: yup.string().required('Appointment Time is required'),
});


const BookingDetails: React.FC<BookingDetailsProps> = ({ onBook }) => {
  const { control, handleSubmit } = useForm<BookingDetailsFormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<BookingDetailsFormData> = (data) => {
    console.log(data);
    onBook(data);
    navigate('/confirmation');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Booking Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="appointmentDate"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label="Appointment Date"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="appointmentTime"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="time"
                label="Appointment Time"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Book
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookingDetails;
