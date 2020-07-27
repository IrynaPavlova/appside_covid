import React from "react";
//import PropTypes from "prop-types";
import styles from "./modal.module.css";
import CountriesListItem from "../countriesListItem/CountriesListItem";

function Modal({ changeModal, country }) {
  const handleKeyDown = code => {
    if (code === "Escape") {
      changeModal();
    }
  };

  const handleBackdropClick = (target, currentTarget) => {
    if (target === currentTarget) {
      changeModal();
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={({ target, currentTarget }) => {
        handleBackdropClick(target, currentTarget);
      }}
      onKeyDown={({ code }) => handleKeyDown(code)}
    >
      <div className={styles.modal_close}>
        <i
          className="fa fa-times"
          id="close"
          aria-hidden="true"
          onClick={({ target, currentTarget }) => {
            handleBackdropClick(target, currentTarget);
          }}
        ></i>
      </div>

      <CountriesListItem country={country} />
    </div>
  );
}

//Modal.propTypes = {};

export default Modal;
