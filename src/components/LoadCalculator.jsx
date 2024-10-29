import React, { useState, useRef, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Stepper, 
  Step, 
  StepLabel, 
  Button,
  MobileStepper,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CustomerInfo from './CustomerInfo';
import LoadCategories from './LoadCategories';
import Summary from './Summary';
import PrintableReport from './PrintableReport';

const steps = ['Customer Information', 'Load Details', 'Review & Sign'];

const LoadCalculator = ({ initialData, onDataChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState(initialData?.customerData || {
    customerName: '',
    customerAddress: '',
    customerAddress2: '',
    customerCityStateZip: '',
    customerPhone: '',
    installerContact: '',
    installerPhone: ''
  });
  const [loads, setLoads] = useState(initialData?.loads || {});
  const [monthsPerYear, setMonthsPerYear] = useState(initialData?.monthsPerYear || {});
  const [solarProduction, setSolarProduction] = useState(initialData?.solarProduction || '');
  const printRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    onDataChange?.({
      customerData,
      loads,
      monthsPerYear,
      solarProduction
    });
  }, [customerData, loads, monthsPerYear, solarProduction, onDataChange]);

  const handleCustomerDataChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoadChange = (category, item, quantity, months) => {
    setLoads(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: quantity
      }
    }));

    if (months) {
      setMonthsPerYear(prev => ({
        ...prev,
        [`${category}-${item}`]: months
      }));
    }
  };

  const handleSolarProductionChange = (value) => {
    setSolarProduction(value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CustomerInfo 
            data={customerData}
            onChange={handleCustomerDataChange}
            solarProduction={solarProduction}
            onSolarProductionChange={handleSolarProductionChange}
          />
        );
      case 1:
        return (
          <LoadCategories
            loads={loads}
            monthsPerYear={monthsPerYear}
            onChange={handleLoadChange}
          />
        );
      case 2:
        return (
          <>
            <Summary 
              loads={loads} 
              monthsPerYear={monthsPerYear}
              solarProduction={solarProduction}
            />
            <Box sx={{ mt: 4 }}>
              <PrintableReport
                ref={printRef}
                customerData={customerData}
                loads={loads}
                monthsPerYear={monthsPerYear}
              />
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto' }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: { xs: 2, md: 4 },
          background: '#ffffff',
          borderRadius: 3
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{
            mb: 4,
            color: 'primary.main',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Electricity Load Calculator
        </Typography>

        {isMobile ? (
          <MobileStepper
            variant="text"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{ 
              maxWidth: '100%', 
              flexGrow: 1,
              mb: 3,
              backgroundColor: 'transparent'
            }}
            nextButton={
              <Button 
                size="small" 
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {steps[activeStep + 1]}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button 
                size="small" 
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                {steps[activeStep - 1]}
              </Button>
            }
          />
        ) : (
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                typography: 'subtitle2'
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Box sx={{ mt: 4, mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            fullWidth={isMobile}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            fullWidth={isMobile}
          >
            {activeStep === steps.length - 2 ? 'Review' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoadCalculator;
