import DropdownSelect from "@/components/common/DropDownSelect";
import React, { useState, useEffect } from "react";

export default function LoanCalculator({leaseBedrag}) {
  const [leaseAmount, setLeaseAmount] = useState(leaseBedrag || 20000);
  const [slotTermijn, setSlotTermijn] = useState("4000");
  const [looptijd, setLooptijd] = useState("12");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [isZakelijk, setIsZakelijk] = useState(true);
  const [activeTab, setActiveTab] = useState("calculator"); // New state for active tab

  const calculateMonthlyPayment = () => {
    const amount = parseFloat(leaseAmount) || 0;
    const finalPayment = parseFloat(slotTermijn) || 0;
    const months = parseInt(looptijd) || 12;

    // Annual interest rate (5.9% for business)
    const annualRate = isZakelijk ? 0.059 : 0.069;

    if (amount > 0) {
      // Calculate depreciation per month
      const depreciationAmount = amount - finalPayment;
      const monthlyDepreciation = depreciationAmount / months;

      // Calculate average interest
      const averageFinanceAmount = (amount + finalPayment) / 2;
      const monthlyInterest = (averageFinanceAmount * annualRate) / 12;

      // Total monthly payment is depreciation + interest
      const totalMonthly = monthlyDepreciation + monthlyInterest;

      setMonthlyPayment(totalMonthly.toFixed(2));
    }
  };

  useEffect(() => {
    calculateMonthlyPayment();
  }, [leaseAmount, slotTermijn, looptijd, isZakelijk]); // Tab styles
  const tabStyle = {
    padding: "1rem 1.5rem",
    cursor: "pointer",
    fontWeight: "400",
    display: "inline-block",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    borderBottom: "none",
    width: "50%",
    textAlign: "center",
    color: "#666",
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: "2px solid #ff6b00",
    color: "#1a2b3c",
    fontWeight: "600",
  };

  // Tab content components
  const CalculatorTab = () => (
    <form onSubmit={(e) => e.preventDefault()} className="calculator-form">
      {" "}
      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", color: "#1a2b3c" }}
        >
          Lease Amount
        </label>
        <input
          type="number"
          className="form-control"
          value={leaseAmount}
          onChange={(e) => setLeaseAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            backgroundColor: "#f8f9fa",
          }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", color: "#1a2b3c" }}
        >
          Final Payment
        </label>
        <input
          type="number"
          className="form-control"
          value={slotTermijn}
          onChange={(e) => setSlotTermijn(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            backgroundColor: "#f8f9fa",
          }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", color: "#1a2b3c" }}
        >
          Term
        </label>
        <select
          value={looptijd}
          onChange={(e) => setLooptijd(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <option value="12">12 months</option>
          <option value="24">24 months</option>
          <option value="36">36 months</option>
          <option value="48">48 months</option>
          <option value="60">60 months</option>
          <option value="72">72 months</option>
        </select>
      </div>
      <div className="form-group" style={{ marginBottom: "2rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", color: "#1a2b3c" }}
        >
          Type
        </label>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <input
              type="radio"
              id="particulier"
              name="type"
              checked={!isZakelijk}
              onChange={() => setIsZakelijk(false)}
              style={{ marginRight: "0.5rem" }}
            />
            <label htmlFor="particulier">Private</label>
          </div>
          <div>
            <input
              type="radio"
              id="zakelijk"
              name="type"
              checked={isZakelijk}
              onChange={() => setIsZakelijk(true)}
              style={{ marginRight: "0.5rem" }}
            />
            <label htmlFor="zakelijk">Business</label>
          </div>
        </div>
      </div>{" "}
      <div
        className="result"
        style={{
          backgroundColor: "#1a2b3c",
          color: "white",
          padding: "1.5rem",
          borderRadius: "5px",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          Monthly Payment
        </div>
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
          €{monthlyPayment}
        </div>
      </div>
      <button
        className="submit-button"
        type="submit"
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#ff6b00",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Next Step
      </button>
    </form>
  );
  const ExplanationTab = () => (
    <div className="info-tab" style={{ color: "#333", lineHeight: "1.6" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h4
          style={{ fontSize: "18px", marginBottom: "0.8rem", color: "#1a2b3c" }}
        >
          How does the financial lease calculator work?
        </h4>
        <p style={{ marginBottom: "1rem" }}>
          With the financial lease calculator, you can determine what your
          monthly lease payment will be.
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h5
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1a2b3c",
          }}
        >
          Lease Amount
        </h5>
        <p>
          The lease amount is the amount you want to finance. Enter the full
          purchase price of your desired car here, potentially reduced by your
          down payment or trade-in value of your previous car.
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h5
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1a2b3c",
          }}
        >
          Final Payment
        </h5>
        <p>
          Determine what additional amount you want to pay for the final term.
          This is not mandatory, but it can significantly lower your monthly
          payments.
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h5
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#1a2b3c",
          }}
        >
          Term
        </h5>
        <p>
          How soon do you want your financial lease contract to be fully paid
          off? The maximum term is 72 months.
        </p>
      </div>

      <div
        style={{
          marginBottom: "0.5rem",
          fontSize: "0.85rem",
          fontStyle: "italic",
        }}
      >
        Note: Acceptance without annual financial statements is possible.
      </div>
    </div>
  );

  return (
    <section className="">
      <div
        className="loan-calculator-form"
        style={{
          maxWidth: "560px",
          padding: "2rem 0PX",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {" "}
        <div className="box-title">
          <h2
            className="title-ct"
            style={{ fontSize: "28px", color: "#1a2b3c", marginBottom: "1rem" }}
          >
            Calculate your monthly lease payment!
          </h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Whether you've found your dream car in our lease inventory, via
            marketplace, or at another car dealership.
          </p>
        </div>
        {/* Tab Navigation */}
        <div
          className="tab-navigation"
          style={{
            display: "flex",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "0",
          }}
        >
          <div
            onClick={() => setActiveTab("calculator")}
            style={activeTab === "calculator" ? activeTabStyle : tabStyle}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <span>Calculator</span>
            </div>
          </div>
          <div
            onClick={() => setActiveTab("info")}
            style={activeTab === "info" ? activeTabStyle : tabStyle}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <span>Uitleg</span>
            </div>
          </div>
        </div>
        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "calculator" ? <CalculatorTab /> : <ExplanationTab />}
        </div>
      </div>
    </section>
  );
}
