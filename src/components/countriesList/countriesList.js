import React from "react";
//import PropTypes from "prop-types";
import styles from "./countriesList.module.css";
import CountriesListItem from "../countriesListItem/CountriesListItem";

const CountriesList = ({ countries, showInfo, isOpen, countryInfo }) => (
  <ul className={styles.countriesList}>
    {countries.map(country => (
      <li
        id={country.CountryCode}
        key={country.CountryCode}
        onClick={e => {
          showInfo(e);
        }}
      >
        {country.Country}
      </li>
    ))}
    {isOpen && <CountriesListItem country={countryInfo} />}
  </ul>
);

export default CountriesList;
