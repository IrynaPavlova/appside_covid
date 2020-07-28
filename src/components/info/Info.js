import React, { Component } from "react";
import services from "../../services/services";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CountriesList from "../countriesList/countriesList";
import styles from "./info.module.css";
import moment from "moment";

class Info extends Component {
  state = {
    country: "",
    data: [],
    info: [],
    isLoading: true,
    countryInfo: {},
    showModal: false
  };

  componentDidMount() {
    this.getPosition();
    this.getInfo();
  }

  getLocation(options) {
    this.setState({ isLoading: true });
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      } else {
        alert("Geolocation is not supported by this browser");
      }
    });
  }

  getPosition() {
    this.getLocation()
      .then(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({ isLoading: true });
        services.getCountry(lat, lng).then(data => {
          this.setState({ data: data });
          const countryData = this.state.data;
          const countryDataType = countryData.filter(elem =>
            elem.types.includes("country")
          );
          const countryShortName =
            countryDataType[0].address_components[0].short_name;

          this.setState({ country: countryShortName, isLoading: false });
        });
      })
      .catch(error => console.log("error", error));
  }

  getInfo() {
    services
      .getInfo()
      .then(data => this.setState({ info: data.data.Countries }));
  }

  showInfo = e => {
    const [object] = this.state.info.filter(
      item => item.CountryCode === e.target.id
    );
    this.setState({ countryInfo: object });
  };

  changeModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };
  render() {
    const {
      isLoading,
      country,
      info,
      isOpen,
      countryInfo,
      showModal
    } = this.state;
    return (
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader
              type="ThreeDots"
              color="#393939"
              height={120}
              width={120}
              timeout={15000}
            />
          </div>
        )}
        {info !== [] &&
          country !== "" &&
          info.map(
            elem =>
              elem.CountryCode.includes(`${country}`) && (
                <div key={elem.CountryCode}>
                  <h1>COVID info</h1>
                  <h2>in your country:</h2>
                  <div className={styles.covidInfo}>
                    <h3 className={styles.country}>{elem.Country}</h3>
                    <div className={styles.covidInfoWrapper}>
                      <div>
                        <p>{moment(elem.Date).format("DD MMMM YYYY")}</p>
                        <p>
                          <span>New Confirmed: </span>
                          {elem.NewConfirmed}
                        </p>
                        <p>
                          <span>New Deaths: </span>
                          {elem.NewDeaths}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span>Total Confirmed: </span>
                          {elem.TotalConfirmed}
                        </p>
                        <p>
                          <span>Total Deaths: </span>
                          {elem.TotalDeaths}
                        </p>
                        <p>
                          <span>Total Recovered: </span>
                          {elem.TotalRecovered}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}

        {!isLoading && info !== [] && (
          <CountriesList
            countries={info}
            showInfo={this.showInfo}
            isOpen={isOpen}
            countryInfo={countryInfo}
            showModal={showModal}
            changeModal={this.changeModal}
          />
        )}
      </div>
    );
  }
}

export default Info;
