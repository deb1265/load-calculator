import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoadCalculator from './components/LoadCalculator';
import SessionManager from './components/SessionManager';
import { getSessionFromUrl, getSessionData, saveSessionData } from './utils/sessionManager';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8'
    },
    secondary: {
      main: '#059669',
      light: '#10b981',
      dark: '#047857'
    }
  }
});

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [calculatorData, setCalculatorData] = useState(null);

  useEffect(() => {
    const urlSessionId = getSessionFromUrl();
    if (urlSessionId) {
      setSessionId(urlSessionId);
      const savedData = getSessionData(urlSessionId);
      if (savedData) {
        setCalculatorData(savedData);
      }
    }
  }, []);

  const handleSessionStart = (newSessionId) => {
    setSessionId(newSessionId);
    window.location.hash = `session=${newSessionId}`;
  };

  const handleDataChange = (newData) => {
    setCalculatorData(newData);
    if (sessionId) {
      saveSessionData(sessionId, newData);
    }
  };

  if (!sessionId) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionManager onSessionStart={handleSessionStart} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadCalculator 
          initialData={calculatorData}
          onDataChange={handleDataChange}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
