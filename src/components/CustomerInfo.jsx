import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Paper, 
  Box,
  Alert,
  InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const INSTALLER_INFO = {
  company: 'Patriot Energy Solutions Corp.',
  address: '1265 Sunrise Highway',
  city: 'Bayshore',
  state: 'NY',
  zip: '11706'
};

const CustomerInfo = ({ data, onChange, solarProduction, onSolarProductionChange }) => {
  const handleSolarProductionChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      onSolarProductionChange(value);
    }
  };

  return (
    <Box>
      {/* Solar Production Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'primary.dark', 
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SolarPowerIcon />
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Solar Production
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Annual Solar Production (kWh)"
              value={solarProduction}
              onChange={handleSolarProductionChange}
              type="number"
              InputProps={{
                inputProps: { min: 0 }
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Customer Information Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'primary.light', 
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <PersonIcon />
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Customer Information
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={data.customerName}
              onChange={(e) => onChange('customerName', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={data.customerPhone}
              onChange={(e) => onChange('customerPhone', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              value={data.customerAddress}
              onChange={(e) => onChange('customerAddress', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apartment, suite, etc. (optional)"
              value={data.customerAddress2}
              onChange={(e) => onChange('customerAddress2', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City, State, ZIP"
              value={data.customerCityStateZip}
              onChange={(e) => onChange('customerCityStateZip', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Installer Information Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          bgcolor: 'secondary.light', 
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <BusinessIcon />
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Installer Information
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={INSTALLER_INFO.company}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                borderRadius: 1,
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                  opacity: 0.8
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Name"
              value={data.installerContact}
              onChange={(e) => onChange('installerContact', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={data.installerPhone}
              onChange={(e) => onChange('installerPhone', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Address"
              value={`${INSTALLER_INFO.address}`}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                borderRadius: 1,
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                  opacity: 0.8
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City, State, ZIP"
              value={`${INSTALLER_INFO.city}, ${INSTALLER_INFO.state} ${INSTALLER_INFO.zip}`}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                borderRadius: 1,
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                  opacity: 0.8
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomerInfo;
