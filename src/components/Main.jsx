import React, { Component } from "react";
import Welcome from "./Welcome.js";
import NewInvestment from "./New-investment.js";
import InvestmentModal from "./Investment-modal.js";
import "../style/main.css";

class Main extends Component {

  state = {
    welcome: true,
    investments: [
      {
        options: ['Prestadero', 'Piggo', 'Kueski', 'GBMHomebroker'],
        selectedOption: null,
        quantity: 0
      }
    ],
    showInvestmentModal: false
  };

  closeFunction = () => {
    this.setState({ welcome: false });
  };

  addInvestment = () => {

    this.setState({ showInvestmentModal: true })
    // let newInvestment = {
    //   options: [
    //     'Prestadero', 'Piggo', 'Kueski', 'GBMHomebroker'
    //   ],
    //   selectedOption: null
    // }

    // let investments = this.state.investments;
    // investments.push(newInvestment)
    // this.setState({ investments });
  }

  deleteInvestment = index => {
    let investments = this.state.investments
    investments.splice(index, 1);
    this.setState({ investments })
  }

  setSelectedOption = (option, index) => {
    let investments = this.state.investments;
    investments[index].selectedOption = option
    this.setState({ investments })

  }

  render() {
    const investmentModal = this.state.showInvestmentModal ? <InvestmentModal /> : null

    const welcome = this.state.welcome ? <Welcome closeCallBack={this.closeFunction} /> : null
    return (
      <section className="main">
        <div className="intro center">Para iniciar una simulacion da click en el boton +<br />
        !Puedes crear tantas simulaciones como quieras!</div>
        {
          this.state.investments.map((investment, index) =>
            <NewInvestment options={investment.options}
              deleteCallback={this.deleteInvestment}
              setOptionCallback={this.setSelectedOption}
              selectedOption={investment.selectedOption}
              key={index}
              index={index} />
          )
        }
        <div className="add_new center">
          <i className="large material-icons" onClick={this.addInvestment}>add</i>
        </div>
        {welcome}
        {investmentModal}
      </section >
    );
  }
}

export default Main;
