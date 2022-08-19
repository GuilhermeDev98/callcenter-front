import React from 'react'
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import Routes from "./routes";
import store from './Redux/store'

const theme = createTheme({
    palette: {
      background: {
        default: "#F0F2F5"
      }
    }
  });



const App = () => (
  
    <ThemeProvider  theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Routes />
      </Provider>
    </ThemeProvider>
  
  )

export default App;
