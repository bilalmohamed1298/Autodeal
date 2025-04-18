import React, { useState, useEffect } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import "./sellCar.css";
import { useSearchParams } from "react-router-dom";

const metadata = {
  title: "Sell Car || AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
};

export default function SellCarPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [carData, setCarData] = useState({
    licensePlate: searchParams.get("licensePlate") || "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    color: "",
    fuel: "lpg",
    transmission: "manual",
    bodyStyle: "pickup",
    upholstery: "leather",
  });
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({
    interior: 0,
    exterior: 0,
    technical: 0,
    tires: 0,
  });
  const [yesNoAnswers, setYesNoAnswers] = useState({
    isDrivable: null,
    isDamageFree: null,
    hasMaintenanceBooklets: null,
  });
  const [carOptions, setCarOptions] = useState({
    powerSteering: false,
    airConditioning: false,
    electricWindows: false,
    adaptiveCruiseControl: false,
    frontParkingSensors: false,
    rearCamera: false,
    headupDisplay: false,
    panoramicRoof: false,
    sportsPackage: false,
    electricallyAdjustableSeats: false,
    xenonLighting: false,
    towbar: false,
    climateControl: false,
    alloyWheels: false,
    cruiseControl: false,
    centralDoorLocking: false,
    rearParkingSensors: false,
    navigation: false,
    airSuspension: false,
    sunroof: false,
    seatHeating: false,
    sportsSeats: false,
    ledLighting: false,
    sevenPersonVersion: false,
  });

  useEffect(() => {
    if (carData.licensePlate) {
      searchCarByLicensePlate(carData.licensePlate);
    }
  }, []);

  const searchCarByLicensePlate = async (licensePlate) => {
    if (!licensePlate) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("Searching for license plate:", licensePlate);
      const response = await fetch(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${licensePlate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.length > 0) {
        const carInfo = data[0];
        console.log("Car details found:", carInfo);

        setCarDetails(carInfo);
        setCarData((prev) => ({
          ...prev,
          brand: carInfo.merk || "",
          model: carInfo.handelsbenaming || "",
          year: carInfo.datum_eerste_toelating
            ? carInfo.datum_eerste_toelating.substring(0, 4)
            : "",
          color: carInfo.eerste_kleur || "",
          bodyStyle: carInfo.inrichting ? carInfo.inrichting.toLowerCase() : "",
        }));
      } else {
        console.log("No car found with this license plate");
        setError("No car found with this license plate");
      }
    } catch (err) {
      console.error("Error fetching car details:", err);
      setError("Error fetching car details: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarDataChange = (field, value) => {
    setCarData((prev) => ({ ...prev, [field]: value }));

    // If license plate is changed, trigger search
    if (field === "licensePlate") {
      searchCarByLicensePlate(value);
    }
  };

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleYesNoChange = (question, value) => {
    setYesNoAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleOptionChange = (option) => {
    setCarOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleNext = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "active";
    return "";
  };

  const getProgressWidth = () => {
    return ((currentStep - 1) / 3) * 100 + "%";
  };

  const renderStarRating = (category, value) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4].map((star) => (
          <span
            key={star}
            className={`star ${star <= value ? "filled" : ""}`}
            onClick={() => handleRatingChange(category, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderYesNoButtons = (question, value) => {
    return (
      <div className="yes-no-buttons">
        <button
          className={`yes-no-btn ${value === true ? "active" : "inactive"}`}
          onClick={() => handleYesNoChange(question, true)}
        >
          Yes
        </button>
        <button
          className={`yes-no-btn ${value === false ? "active" : "inactive"}`}
          onClick={() => handleYesNoChange(question, false)}
        >
          No
        </button>
      </div>
    );
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <div className="sell-car-page">
        <div className="progress-bar">
          <div className="progress-line"></div>
          <div
            className="progress-line-filled"
            style={{ width: getProgressWidth() }}
          ></div>

          <div className={`progress-step ${getStepStatus(1)}`}>
            <div className={`step-dot ${getStepStatus(1)}`}></div>
            <span className="step-label">Gegevens</span>
          </div>
          <div className={`progress-step ${getStepStatus(2)}`}>
            <div className={`step-dot ${getStepStatus(2)}`}></div>
            <span className="step-label">Staat</span>
          </div>
          <div className={`progress-step ${getStepStatus(3)}`}>
            <div className={`step-dot ${getStepStatus(3)}`}></div>
            <span className="step-label">Opties</span>
          </div>
          <div className={`progress-step ${getStepStatus(4)}`}>
            <div className={`step-dot ${getStepStatus(4)}`}></div>
            <span className="step-label">Afronden</span>
          </div>

          <span className="emoji-icon">😎</span>
        </div>

        {currentStep === 1 && (
          <div className="car-form-container">
            <div className="form-section">
              <h2>Your car</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">License plate number</label>
                  <div className="license-plate-input">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="DDD-DD-D"
                      value={carData.licensePlate}
                      onChange={(e) =>
                        handleCarDataChange("licensePlate", e.target.value)
                      }
                    />
                    {isLoading && (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </div>
                  {error && <div className="error-message">{error}</div>}
                 
                </div>
                <div className="form-group">
                  <label className="form-label required">Brand</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter brand"
                    value={carData.brand}
                    onChange={(e) =>
                      handleCarDataChange("brand", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Model</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter model"
                    value={carData.model}
                    onChange={(e) =>
                      handleCarDataChange("model", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Year</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter year"
                    value={carData.year}
                    onChange={(e) =>
                      handleCarDataChange("year", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Mileage</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter mileage"
                    value={carData.mileage}
                    onChange={(e) =>
                      handleCarDataChange("mileage", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Color</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter color"
                    value={carData.color}
                    onChange={(e) =>
                      handleCarDataChange("color", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fuel</label>
                  <select
                    className="form-select"
                    value={carData.fuel}
                    onChange={(e) =>
                      handleCarDataChange("fuel", e.target.value)
                    }
                  >
                    <option value="lpg">LPG</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Transmission</label>
                  <select
                    className="form-select"
                    value={carData.transmission}
                    onChange={(e) =>
                      handleCarDataChange("transmission", e.target.value)
                    }
                  >
                    <option value="manual">Manual transmission</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Body style</label>
                  <select
                    className="form-select"
                    value={carData.bodyStyle}
                    onChange={(e) =>
                      handleCarDataChange("bodyStyle", e.target.value)
                    }
                  >
                    <option value="pickup">Pickup</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="wagon">Wagon</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Upholstery</label>
                  <select
                    className="form-select"
                    value={carData.upholstery}
                    onChange={(e) =>
                      handleCarDataChange("upholstery", e.target.value)
                    }
                  >
                    <option value="leather">Leather</option>
                    <option value="fabric">Fabric</option>
                    <option value="vinyl">Vinyl</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Data from your car</h2>
              <p className="form-description">
                Fill in all the details as accurately as possible and receive a
                free and non-binding offer within 1 hour. You are not committed
                to anything!
              </p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="condition-form">
            <div className="condition-questions">
              <h2>What is the condition of your car</h2>
              <p className="form-description">
                Fill in the information about the condition of your car as
                clearly and honestly as possible. Only then can we make you the
                most realistic offer possible!
              </p>

              <div className="condition-item">
                <span className="condition-item-label">Interior condition</span>
                {renderStarRating("interior", ratings.interior)}
              </div>

              <div className="condition-item">
                <span className="condition-item-label">Exterior condition</span>
                {renderStarRating("exterior", ratings.exterior)}
              </div>

              <div className="condition-item">
                <span className="condition-item-label">
                  Technical condition
                </span>
                {renderStarRating("technical", ratings.technical)}
              </div>

              <div className="condition-item">
                <span className="condition-item-label">
                  Condition of the tyres
                </span>
                {renderStarRating("tires", ratings.tires)}
              </div>

              <div className="condition-item">
                <span className="condition-item-label">
                  Is the car drivable?
                </span>
                {renderYesNoButtons("isDrivable", yesNoAnswers.isDrivable)}
              </div>

              <div className="condition-item">
                <div>
                  <span className="condition-item-label">
                    Is the car damage-free?
                  </span>
                  <div className="small-text">excl. gebruikerssporen</div>
                </div>
                {renderYesNoButtons("isDamageFree", yesNoAnswers.isDamageFree)}
              </div>

              <div className="condition-item">
                <span className="condition-item-label">
                  Maintenance booklets available?
                </span>
                {renderYesNoButtons(
                  "hasMaintenanceBooklets",
                  yesNoAnswers.hasMaintenanceBooklets
                )}
              </div>
            </div>

            <div className="features-section">
              <div className="features-list">
                <h3>Well</h3>
                <div className="feature-item positive">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Fast and reliable</span>
                </div>
                <div className="feature-item positive">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Experienced car sales specialists</span>
                </div>
                <div className="feature-item positive">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Free of charge and without obligation</span>
                </div>
              </div>

              <div className="features-list">
                <h3>No</h3>
                <div className="feature-item negative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>Negotiating the price</span>
                </div>
                <div className="feature-item negative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>Strangers at your door</span>
                </div>
                <div className="feature-item negative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>Car auction</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div
            className="options-form"
            style={{ display: "flex", padding: "20px", gap: "60px" }}
          >
            <div
              className="options-grid"
              style={{ flex: "1.8", display: "flex", gap: "40px" }}
            >
              <div className="options-column" style={{ flex: "1" }}>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.powerSteering}
                    onChange={() => handleOptionChange("powerSteering")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Power steering</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.airConditioning}
                    onChange={() => handleOptionChange("airConditioning")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Air conditioning</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.electricWindows}
                    onChange={() => handleOptionChange("electricWindows")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Electric windows</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.adaptiveCruiseControl}
                    onChange={() => handleOptionChange("adaptiveCruiseControl")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>
                    Adaptive cruise control
                  </span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.frontParkingSensors}
                    onChange={() => handleOptionChange("frontParkingSensors")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>
                    Front parking sensors
                  </span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.rearCamera}
                    onChange={() => handleOptionChange("rearCamera")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Rear camera</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.headupDisplay}
                    onChange={() => handleOptionChange("headupDisplay")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Headup display</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.panoramicRoof}
                    onChange={() => handleOptionChange("panoramicRoof")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Panoramic roof</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.sportsPackage}
                    onChange={() => handleOptionChange("sportsPackage")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Sports package</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.electricallyAdjustableSeats}
                    onChange={() =>
                      handleOptionChange("electricallyAdjustableSeats")
                    }
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>
                    Electrically adjustable seats
                  </span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.xenonLighting}
                    onChange={() => handleOptionChange("xenonLighting")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Xenon lighting</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.towbar}
                    onChange={() => handleOptionChange("towbar")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Towbar</span>
                </label>
              </div>
              <div className="options-column" style={{ flex: "1" }}>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.climateControl}
                    onChange={() => handleOptionChange("climateControl")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Climate control</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.alloyWheels}
                    onChange={() => handleOptionChange("alloyWheels")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Alloy wheels</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.cruiseControl}
                    onChange={() => handleOptionChange("cruiseControl")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Cruise control</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.centralDoorLocking}
                    onChange={() => handleOptionChange("centralDoorLocking")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Central door locking</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.rearParkingSensors}
                    onChange={() => handleOptionChange("rearParkingSensors")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Rear parking sensors</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.navigation}
                    onChange={() => handleOptionChange("navigation")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Navigation</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.airSuspension}
                    onChange={() => handleOptionChange("airSuspension")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Air suspension</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.sunroof}
                    onChange={() => handleOptionChange("sunroof")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Sunroof</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.seatHeating}
                    onChange={() => handleOptionChange("seatHeating")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Seat heating</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.sportsSeats}
                    onChange={() => handleOptionChange("sportsSeats")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>Sports seats</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.ledLighting}
                    onChange={() => handleOptionChange("ledLighting")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>LED lighting</span>
                </label>
                <label
                  className="option-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={carOptions.sevenPersonVersion}
                    onChange={() => handleOptionChange("sevenPersonVersion")}
                    style={{ width: "20px", height: "20px", margin: "0" }}
                  />
                  <span style={{ fontSize: "16px" }}>7-person version</span>
                </label>
              </div>
            </div>
            <div style={{ flex: "1.8" }}>
              <h2
                style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}
                className="text-center"
              >
                What options does your car have?
              </h2>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="complete-application">
            <div className="application-form">
              <div className="form-left">
                <h2>Complete your application</h2>
                <div className="form-group">
                  <label>First name*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label>Surname*</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your surname"
                  />
                </div>
                <div className="form-group">
                  <label>Telephone number*</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label>Expected price</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter expected price"
                  />
                </div>
              </div>
              <div className="form-right">
                <p className="form-description">
                  With us, you don't just receive an appraisal value. After
                  filling in your details, you will receive a personal offer
                  from one of our sales specialists.
                </p>

                <div className="features-section">
                  <h3>Well</h3>
                  <div className="feature-list">
                    <div className="feature-item positive">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>Fast and reliable</span>
                    </div>
                    <div className="feature-item positive">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>Experienced car sales specialists</span>
                    </div>
                    <div className="feature-item positive">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>Free of charge and without obligation</span>
                    </div>
                  </div>

                  <h3>No</h3>
                  <div className="feature-list">
                    <div className="feature-item negative">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      <span>Negotiating the price</span>
                    </div>
                    <div className="feature-item negative">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      <span>Strangers at your door</span>
                    </div>
                    <div className="feature-item negative">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      <span>Car auction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button className="back-btn" onClick={handleBack}>
                <span>‹</span> back
              </button>
              <button className="register-btn" onClick={handleNext}>
                Register my car
              </button>
            </div>

            <p className="form-note">
              You will receive a fair offer within 2 hours, free of charge and
              without obligation.
            </p>
          </div>
        )}

        {currentStep === 5 && (
          <div className="thank-you-page">
            <div className="thank-you-content">
              <h1>Thank you for your inquiry!</h1>
              <p className="confirmation-message">
                Your application has been sent and we will get to work for you.
              </p>

              <div className="photo-instructions">
                <p>
                  In order to present your car in the best possible way to our
                  network of professional dealers, it is important to take some
                  good photos of your car and add them to your registration.
                  This often leads to more interest and often higher prices.{" "}
                  <a href="#" className="photo-guide-link">
                    Find out how to take good photos in our article
                  </a>{" "}
                  and take pictures anyway of:
                </p>

                <ul className="photo-checklist">
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>The front of the car</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>The side of the car</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>The rear of the car</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>The interior of the car</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Any damage and signs of wear on/on the car</span>
                  </li>
                </ul>

                <div className="photo-upload-buttons">
                  <button className="whatsapp-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send photos via WhatsApp
                  </button>
                  <button className="email-button">
                    Send photos via email
                  </button>
                </div>
              </div>
            </div>
            <div className="thank-you-image">
              <img
                src="/assets/images/call-to-action-woman-steer.webp"
                alt="Happy person with car"
                className="thank-you-img"
              />
            </div>
          </div>
        )}

        {currentStep < 4 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              className="next-step-btn"
              style={{ background: "#E0E0E0" }}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </button>
            <button
              className="next-step-btn"
              onClick={handleNext}
              disabled={currentStep === 4}
            >
              Next step
            </button>
          </div>
        )}
      </div>
      <Footer1 />
    </>
  );
}
