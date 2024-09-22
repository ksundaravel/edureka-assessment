import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_COUNTRY_DETAILS } from './queries';

const CountryDetails = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { country } = data;

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Code: {country.code}</p>
      <p>Capital: {country.capital}</p>
      <p>Currency: {country.currency}</p>
      <p>Languages: {country.languages.map(lang => lang.name).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;
