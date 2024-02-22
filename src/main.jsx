import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container maxWidth='md' sx={{ my: 8 }}>
      <App />
    </Container>
  </React.StrictMode>
);
