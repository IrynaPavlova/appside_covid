import React from "react";
//import PropTypes from "prop-types";
//import styles from "./countriesListItem.module.css";
import moment from "moment";

const CountriesListItem = ({ country }) => (
  <div>
    <p>{moment(country.Date).format("DD MMMM YYYY")}</p>
    <p>New Confirmed: {country.NewConfirmed}</p>
    <p>New Deaths: {country.NewDeaths}</p>
    <p>Total Confirmed: {country.TotalConfirmed}</p>
    <p>Total Deaths: {country.TotalDeaths}</p>
    <p>Total Recovered: {country.TotalRecovered}</p>
  </div>
);

export default CountriesListItem;
