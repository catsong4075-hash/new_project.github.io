import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import ResultPage from '../pages/ResultPage';
import ShareCardPage from '../pages/ShareCardPage';
import AboutPage from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'result', element: <ResultPage /> },
      { path: 'share', element: <ShareCardPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export default router;
