import React, { Component } from "react";
import services from "../../services/services";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CountriesList from "../countriesList/countriesList";
//import styles from "./info.module.css";
import moment from "moment";

class Info extends Component {
  state = {
    country: "UA", //////!!!!!!!!!!!!!!!
    data: [],
    info: [],
    isLoading: false,
    isOpen: false,
    countryInfo: {}
  };

  componentDidMount() {
    //this.getPosition();
    this.getInfo();
  }

  getLocation(options) {
    this.setState({ isLoading: true });
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  getPosition() {
    this.getLocation()
      .then(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

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
    this.setState({ isLoading: true }); ////!!!!!!
    services
      .getInfo()
      .then(data => this.setState({ info: data.data.Countries }));
    this.setState({ isLoading: false }); /////!!!!!!
  }

  showInfo = e => {
    const [object] = this.state.info.filter(
      item => item.CountryCode === e.target.id
    );
    this.setState({ isOpen: true, countryInfo: object });
    //(state => ({ isOpen: !state.isOpen, countryInfo: object }));
  };
  render() {
    console.log("this.state", this.state);
    const { isLoading, country, info, isOpen, countryInfo } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={80}
            width={80}
            timeout={3000}
          />
        )}
        {info !== [] &&
          country !== "" &&
          info.map(
            elem =>
              elem.CountryCode.includes(`${country}`) && (
                <div key={elem.CountryCode}>
                  <h2>{elem.Country}</h2>

                  <p>{moment(elem.Date).format("DD MMMM YYYY")}</p>
                  <p>New Confirmed: {elem.NewConfirmed}</p>
                  <p>New Deaths: {elem.NewDeaths}</p>
                  <p>Total Confirmed: {elem.TotalConfirmed}</p>
                  <p>Total Deaths: {elem.TotalDeaths}</p>
                  <p>Total Recovered: {elem.TotalRecovered}</p>
                </div>
              )
          )}

        <CountriesList
          countries={info}
          showInfo={this.showInfo}
          isOpen={isOpen}
          countryInfo={countryInfo}
        />
      </div>
    );
  }
}

export default Info;
