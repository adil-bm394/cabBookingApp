import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ServicesDetailsProps {
  onNext: (data: ServicesDetailsFormData) => void; 
}

 const vehicleTypes = ['Car', 'Bike', 'Truck']; 


const schema = yup.object().shape({
  vehicleType: yup.string().required('Vehicle Type is required'),
  vehicleModelNo: yup.string().required('Vehicle Model No. is required'),
});



interface ServicesDetailsFormData {
  vehicleType: string;
  vehicleModelNo: string;
}

const ServicesDetails: React.FC<ServicesDetailsProps> = ({ onNext }) => {
  const { control, handleSubmit } = useForm<ServicesDetailsFormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ServicesDetailsFormData> = (data) => {
    console.log(data); 
    onNext(data);
    navigate('/booking');
  };

  const vehicleTypes = ['Car', 'Bike', 'Truck']; 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Service Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="vehicleType"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Vehicle Type"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              >
                {vehicleTypes.map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="vehicleModelNo"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Vehicle Model No."
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ServicesDetails;
