import React from 'react';
import { Paper, Typography, Box, Grid, Alert } from '@mui/material';
import { loadData } from '../data/loadData';

const Summary = ({ loads, monthsPerYear, solarProduction }) => {
  const calculateTotalKwh = () => {
    let total = 0;
    Object.entries(loads).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, value]) => {
        const itemData = loadData[category]?.[item];
        if (itemData) {
          if (itemData.isEVCharger) {
            total += value.annualKwh || 0;
          } else {
            const months = monthsPerYear[`${category}-${item}`] || itemData.monthsPerYear;
            total += (itemData.monthlyKwh * months * Number(value));
          }
        }
      });
    });
    return total;
  };

  const totalAnnualKwh = calculateTotalKwh();
  const monthlyAverage = totalAnnualKwh / 12;
  const solarOffset = solarProduction ? (Number(solarProduction) / totalAnnualKwh) * 100 : 0;

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        background: 'linear-gradient(45deg, #e3f2fd 0%, #ffffff 100%)',
        borderRadius: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Consumption Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Monthly Average
            </Typography>
            <Typography variant="h5" sx={{ color: 'primary.main' }}>
              {monthlyAverage.toFixed(2)} kWh
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.1)'
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Total Annual Consumption
            </Typography>
            <Typography variant="h5" sx={{ color: 'primary.main' }}>
              {totalAnnualKwh.toFixed(2)} kWh
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: solarOffset > 110 ? 'rgba(211, 47, 47, 0.1)' : 'rgba(46, 125, 50, 0.1)'
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Solar Offset
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: solarOffset > 110 ? 'error.main' : 'success.main'
              }}
            >
              {solarOffset.toFixed(1)}%
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {solarOffset > 110 && (
        <Alert 
          severity="warning" 
          sx={{ mt: 3 }}
        >
          The solar offset exceeds 110%. Consider reviewing the system size or load calculations.
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Solar Production: {solarProduction || 0} kWh/year
        </Typography>
      </Box>
    </Paper>
  );
};

export default Summary;
