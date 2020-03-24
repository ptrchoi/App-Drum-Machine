import React from "react";

class DisplayBanks extends React.Component {
  constructor(props) {
    super(props);

    this.toggleButton = this.toggleButton.bind(this);
  }
  toggleButton(e) {
    e.preventDefault();

    let currentBank = e.target.value;
    let newBank = e.target.id;

    if (currentBank !== newBank) {
      if (newBank === "acoustic") {
        document
          .getElementById("funky")
          .classList.toggle("bank-button-selected");
      } else {
        document
          .getElementById("acoustic")
          .classList.toggle("bank-button-selected");
      }
      e.target.classList.toggle("bank-button-selected");
      this.props.onBankChange(newBank);
    }
  }
  render() {
    let { selectedBank } = this.props;
    return (
      <div className="bank-buttons-container">
        <button
          id="funky"
          className="bank-button bank-button-selected"
          value={selectedBank}
          onClick={this.toggleButton}
        >
          Funky
        </button>
        <button
          id="acoustic"
          className="bank-button"
          value={selectedBank}
          onClick={this.toggleButton}
        >
          Cool
        </button>
      </div>
    );
  }
}

export default DisplayBanks;
