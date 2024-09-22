// src/App.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import client from './apolloClient';
import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

const App = () => (
  <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={CountriesList} />
        <Route path="/country/:code" element={CountryDetails} />
      </Routes>
  </ApolloProvider>
);

export default App;
