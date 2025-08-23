import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import React from 'react';
import { useState } from 'react';

// pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Gems from './pages/gems/Gems'
import GemDetails from "./pages/gems/GemDetails"

// layouts
import RootLayout from './layouts/RootLayout'
import GemsLayout from './layouts/GemsLayout'

// mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout mode={theme.palette.mode} check={darkMode} handleChange={() => setDarkMode(!darkMode)} />}>
        < Route index element={< Home />} />
        < Route path="about" element={< About />} />
        <Route path="gems" element={<GemsLayout />}>
          <Route
            index
            element={<Gems />}
          />
          <Route
            path=":id"
            element={<GemDetails />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route >
    )
  )

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>

  );
}

export default App

