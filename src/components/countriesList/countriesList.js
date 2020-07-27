import React from "react";
//import PropTypes from "prop-types";
import styles from "./countriesList.module.css";
import Modal from "../modal /Modal";

const CountriesList = ({
  countries,
  showInfo,
  isOpen,
  countryInfo,
  showModal,
  changeModal
}) => (
  <div className={styles.container}>
    <h2>in other countries:</h2>
    <ul className={styles.countriesList}>
      {countries.map(country => (
        <li
          className={styles.CountriesListItem}
          id={country.CountryCode}
          key={country.CountryCode}
          onClick={e => {
            changeModal();
            showInfo(e);
          }}
        >
          {country.Country}
        </li>
      ))}
      {showModal && <Modal changeModal={changeModal} country={countryInfo} />}
    </ul>
  </div>
);

export default CountriesList;
