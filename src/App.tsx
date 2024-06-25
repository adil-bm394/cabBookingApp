import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PersonalInfo from './component/PersonalInfo';
import ServicesDetails from './component/ServicesDetails';
import BookingDetails from './component/BookingDetails';
import Confirmation from './component/Confirmation';
import { PersonalInfoFormData, ServicesDetailsFormData, BookingDetailsFormData } from './types'; // Import interfaces

const App: React.FC = () => {
  const [formData, setFormData] = useState<{
    personalInfo?: PersonalInfoFormData;
    servicesDetails?: ServicesDetailsFormData;
    bookingDetails?: BookingDetailsFormData;
  }>({});

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData') || '{}');
    if (Object.keys(storedFormData).length > 0) {
      setFormData(storedFormData);
    }
  }, []);

  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    setFormData({ ...formData, personalInfo: data });
  };

  const handleServicesDetailsSubmit = (data: ServicesDetailsFormData) => {
    setFormData({ ...formData, servicesDetails: data });
  };

  const handleBookingDetailsSubmit = (data: BookingDetailsFormData) => {
    setFormData({ ...formData, bookingDetails: data });
  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalInfo onNext={handlePersonalInfoSubmit} />} />
        <Route path="/services" element={<ServicesDetails onNext={handleServicesDetailsSubmit} />} />
        <Route path="/booking" element={<BookingDetails onBook={handleBookingDetailsSubmit} />} />
        <Route path="/confirmation" element={
          formData.personalInfo && formData.bookingDetails ? (
            <Confirmation
              name={formData.personalInfo.name}
              bookingDate={formData.bookingDetails.appointmentDate}
              bookingTime={formData.bookingDetails.appointmentTime}
            />
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
