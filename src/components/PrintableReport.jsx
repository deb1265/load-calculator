import React, { forwardRef, useState } from 'react';
import { 
  Button,
  Paper, 
  Typography, 
  Grid, 
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { loadData } from '../data/loadData';
import SignatureField from './SignatureField';

const INSTALLER_INFO = {
  company: 'Patriot Energy Solutions Corp.',
  address: '1265 Sunrise Highway',
  city: 'Bayshore',
  state: 'NY',
  zip: '11706'
};

const PrintableReport = forwardRef(({ customerData, loads, monthsPerYear = {} }, ref) => {
  const [customerSignature, setCustomerSignature] = useState(null);
  const [installerSignature, setInstallerSignature] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const calculateTotalKwh = () => {
    let total = 0;
    Object.entries(loads).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, quantity]) => {
        const itemData = loadData[category]?.[item];
        const months = monthsPerYear[`${category}-${item}`] || itemData.monthsPerYear;
        if (itemData) {
          total += (itemData.monthlyKwh * months * Number(quantity));
        }
      });
    });
    return total;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Signature Input Section - Hidden in Print */}
      <Box className="no-print" sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <SignatureField 
              label="Customer Signature" 
              onSave={setCustomerSignature}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SignatureField 
              label="Installer Signature" 
              onSave={setInstallerSignature}
            />
          </Grid>
        </Grid>
        
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          disabled={!customerSignature || !installerSignature}
          fullWidth={isMobile}
          sx={{ alignSelf: isMobile ? 'stretch' : 'flex-start' }}
        >
          Print Report
        </Button>
      </Box>

      {/* Printable Content */}
      <Box className="print-content" ref={ref} sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ mb: 4 }}
        >
          Load Calculation Report
        </Typography>

        {/* Contact Information Section */}
        <Box 
          className="info-container"
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 4
          }}
        >
          {/* Customer Information */}
          <Box 
            className="info-item"
            sx={{ 
              flex: 1,
              minWidth: 0
            }}
          >
            <Paper 
              elevation={1}
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                height: '100%',
                '@media print': {
                  boxShadow: 'none',
                  border: '1px solid #e0e0e0'
                }
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Customer Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                <Typography variant="body1">{customerData.customerName || '-'}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{customerData.customerPhone || '-'}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                <Typography variant="body1">{customerData.customerAddress || '-'}</Typography>
                {customerData.customerAddress2 && (
                  <Typography variant="body1">{customerData.customerAddress2}</Typography>
                )}
                <Typography variant="body1">{customerData.customerCityStateZip || '-'}</Typography>
              </Box>
            </Paper>
          </Box>

          {/* Installer Information */}
          <Box 
            className="info-item"
            sx={{ 
              flex: 1,
              minWidth: 0
            }}
          >
            <Paper 
              elevation={1}
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                height: '100%',
                '@media print': {
                  boxShadow: 'none',
                  border: '1px solid #e0e0e0'
                }
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Installer Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Company</Typography>
                <Typography variant="body1">{INSTALLER_INFO.company}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Contact Name</Typography>
                <Typography variant="body1">{customerData.installerContact || '-'}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{customerData.installerPhone || '-'}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                <Typography variant="body1">{INSTALLER_INFO.address}</Typography>
                <Typography variant="body1">
                  {INSTALLER_INFO.city}, {INSTALLER_INFO.state} {INSTALLER_INFO.zip}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Load Details */}
        <Box className="no-break">
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Load Details
          </Typography>
          
          {Object.entries(loads).map(([category, items]) => (
            Object.entries(items).some(([_, quantity]) => quantity > 0) && (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  {category}
                </Typography>
                <TableContainer 
                  component={Paper} 
                  variant="outlined"
                  sx={{ 
                    overflowX: 'auto',
                    '@media print': {
                      pageBreakInside: 'avoid'
                    }
                  }}
                >
                  <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.50' }}>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Monthly kWh</TableCell>
                        <TableCell align="right">Months/Year</TableCell>
                        <TableCell align="right">Annual kWh</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(items).map(([item, quantity]) => {
                        if (quantity > 0) {
                          const itemData = loadData[category][item];
                          const months = monthsPerYear[`${category}-${item}`] || itemData.monthsPerYear;
                          const annualKwh = itemData.monthlyKwh * months * Number(quantity);
                          return (
                            <TableRow key={item}>
                              <TableCell>{item}</TableCell>
                              <TableCell align="right">{quantity}</TableCell>
                              <TableCell align="right">{itemData.monthlyKwh}</TableCell>
                              <TableCell align="right">{months}</TableCell>
                              <TableCell align="right">{annualKwh.toFixed(2)}</TableCell>
                            </TableRow>
                          );
                        }
                        return null;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )
          ))}

          <Box sx={{ mt: 4, mb: 4, textAlign: 'right' }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              Total Annual Consumption: {calculateTotalKwh().toFixed(2)} kWh
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Signatures Section */}
        <Box className="no-break" sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {customerSignature && (
                <Box>
                  <img 
                    src={customerSignature.image} 
                    alt="Customer Signature" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <Divider sx={{ mt: 1 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Customer Signature - Date: {customerSignature.date}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {customerData.customerName}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {installerSignature && (
                <Box>
                  <img 
                    src={installerSignature.image} 
                    alt="Installer Signature" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <Divider sx={{ mt: 1 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Installer Signature - Date: {installerSignature.date}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {customerData.installerContact}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Certification Statement */}
        <Box className="no-break" sx={{ mt: 6, mb: 4 }}>
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              fontStyle: 'italic',
              px: { xs: 2, sm: 4 }
            }}
          >
            I hereby certify that the above list of loads is an accurate representation of the loads 
            for the residential application at the address listed above.
          </Typography>
        </Box>
      </Box>
    </div>
  );
});

PrintableReport.displayName = 'PrintableReport';

export default PrintableReport;
