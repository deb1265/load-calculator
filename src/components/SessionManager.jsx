import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  TextField,
  Paper,
  Snackbar,
  IconButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { createSession } from '../utils/sessionManager';

const SessionManager = ({ onSessionStart }) => {
  const [sessionUrl, setSessionUrl] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCreateSession = () => {
    const { sessionId, sessionUrl } = createSession();
    setSessionUrl(sessionUrl);
    onSessionStart(sessionId);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sessionUrl);
    setShowSnackbar(true);
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'grey.100'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 500, 
          width: '90%',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Load Calculator
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          Create a new session to start calculating your electrical loads
        </Typography>

        {!sessionUrl ? (
          <Button 
            variant="contained" 
            size="large"
            onClick={handleCreateSession}
            fullWidth
          >
            Create New Session
          </Button>
        ) : (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Your Session URL:
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 2 
            }}>
              <TextField
                fullWidth
                value={sessionUrl}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
              <IconButton 
                onClick={handleCopyUrl}
                color="primary"
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Save this URL to access your session later
            </Typography>
          </Box>
        )}

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message="URL copied to clipboard"
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setShowSnackbar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Paper>
    </Box>
  );
};

export default SessionManager;
