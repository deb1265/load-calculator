import React, { useState } from 'react';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { loadData } from '../data/loadData';

const monthOptions = Array.from({ length: 24 }, (_, i) => (i + 1) * 0.5);

const LoadCategories = ({ loads, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [monthsPerYear, setMonthsPerYear] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQuantityChange = (category, item, value) => {
    const numValue = parseFloat(value);
    const newErrors = { ...errors };

    if (isNaN(numValue) || numValue < 0) {
      newErrors[`${category}-${item}`] = 'Please enter a valid positive number';
    } else {
      delete newErrors[`${category}-${item}`];
    }

    setErrors(newErrors);
    onChange(category, item, value);
  };

  const handleMonthsChange = (category, item, value) => {
    setMonthsPerYear(prev => ({
      ...prev,
      [`${category}-${item}`]: value
    }));
    onChange(category, item, loads[category]?.[item] || 0, value);
  };

  return (
    <Box sx={{ '& .MuiAccordion-root': { mb: 2 } }}>
      {Object.entries(loadData).map(([category, items]) => (
        <Accordion
          key={category}
          expanded={expanded === category}
          onChange={handleChange(category)}
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '&.Mui-expanded': {
                minHeight: 48,
                bgcolor: 'primary.light',
                color: 'white',
                '& .MuiTypography-root': {
                  color: 'white'
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {category}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {Object.entries(items).map(([item, details]) => {
                const errorKey = `${category}-${item}`;
                const monthsKey = `${category}-${item}`;
                const currentMonths = monthsPerYear[monthsKey] || details.monthsPerYear;

                return (
                  <Grid item xs={12} key={item}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        gap: { xs: 2, md: 0 },
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'grey.100'
                        }
                      }}
                    >
                      <Box sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: { xs: 1, md: 0 }
                      }}>
                        <Typography 
                          sx={{ 
                            flexGrow: 1,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}
                        >
                          {item}
                          <Tooltip 
                            title={details.description || ''}
                            arrow
                            placement="top"
                          >
                            <IconButton size="small" sx={{ ml: 1, color: 'primary.main' }}>
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                        justifyContent: { xs: 'space-between', md: 'flex-end' }
                      }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            bgcolor: 'background.paper',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            minWidth: { xs: '100%', md: 80 },
                            textAlign: 'center'
                          }}
                        >
                          {details.monthlyKwh} kWh/mo
                        </Typography>
                        
                        <FormControl 
                          sx={{ 
                            minWidth: { xs: '48%', md: 120 }
                          }} 
                          size="small"
                        >
                          <InputLabel>Months/Year</InputLabel>
                          <Select
                            value={currentMonths}
                            label="Months/Year"
                            onChange={(e) => handleMonthsChange(category, item, e.target.value)}
                          >
                            {monthOptions.map((month) => (
                              <MenuItem key={month} value={month}>
                                {month}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          type="number"
                          label="Quantity"
                          value={loads[category]?.[item] || '0'}
                          onChange={(e) => handleQuantityChange(category, item, e.target.value)}
                          error={!!errors[errorKey]}
                          helperText={errors[errorKey]}
                          inputProps={{ 
                            min: 0,
                            step: 'any'
                          }}
                          size="small"
                          sx={{ 
                            width: { xs: '48%', md: 100 }
                          }}
                        />

                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'white',
                            bgcolor: 'primary.main',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            minWidth: { xs: '100%', md: 100 },
                            textAlign: 'center'
                          }}
                        >
                          {(details.monthlyKwh * currentMonths * (loads[category]?.[item] || 0)).toFixed(2)} kWh/yr
                        </Typography>
                      </Box>
                    </Paper>
                    {errors[errorKey] && (
                      <Box sx={{ mt: 1 }}>
                        <Typography color="error" variant="caption">
                          {errors[errorKey]}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LoadCategories;
