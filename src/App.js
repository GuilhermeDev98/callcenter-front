import React from 'react'
import Routes from "./routes";

import CssBaseline from "@mui/material/CssBaseline";

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      background: {
        default: "#F0F2F5"
      }
    }
  });

const App = () => (
    <ThemeProvider  theme={theme}>
        <CssBaseline />
        <Routes />
    </ThemeProvider >
)

export default App;
