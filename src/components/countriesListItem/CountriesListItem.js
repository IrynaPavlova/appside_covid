import React from "react";
//import PropTypes from "prop-types";
import styles from "./countriesListItem.module.css";
import moment from "moment";

const CountriesListItem = ({ country }) => (
  <div className={styles.covidInfo}>
    <h3 className={styles.country}>{country.Country}</h3>
    <div className={styles.covidInfoWrapper}>
      <div>
        <p>{moment(country.Date).format("DD MMMM YYYY")}</p>
        <p>
          <span>New Confirmed: </span>
          {country.NewConfirmed}
        </p>
        <p>
          <span>New Deaths: </span>
          {country.NewDeaths}
        </p>
      </div>
      <div>
        <p>
          <span>Total Confirmed: </span>
          {country.TotalConfirmed}
        </p>
        <p>
          <span>Total Deaths: </span>
          {country.TotalDeaths}
        </p>
        <p>
          <span>Total Recovered: </span>
          {country.TotalRecovered}
        </p>
      </div>
    </div>
  </div>
);

export default CountriesListItem;
