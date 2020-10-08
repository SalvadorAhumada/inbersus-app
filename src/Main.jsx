import React, { Component } from "react";
import Table from "./table";
import Charts from "./Charts.jsx";
import Welcome from "./Welcome.js";
import { ReactComponent as Logo } from "./logo.svg";
import { Animated } from "react-animated-css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investment: 0,
      periods: [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
      interest: 0,
      monthly: 0,
      show_result: false,
      results: [],
      warning: false,
      loading: false,
      type: "table",
    };
  }

  componentDidMount() {
    document.getElementById("send-form").onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.startLoading();
      }
    };
  }

  handleChange(e) {
    this.setState({ investment: e.target.value });
  }

  handleMonth(e) {
    this.setState({ monthly: e.target.value });
  }

  handleInterest(e) {
    if (e.target.value > 30 || e.target.value < 0) return;
    this.setState({ interest: e.target.value });
  }

  setLoading = () => {
    if (this.state.loading === true) {
      this.setState({ loading: false });
    }
  };

  startLoading() {
    let option = document.getElementById("time_dropdown");
    let selected_time = option.options[option.selectedIndex].value;
    let { investment } = this.state;
    let interest = 1 + this.state.interest / 100 / 12;

    if (selected_time === "Meses" || investment === 0 || interest === 1) {
      this.setState({ warning: true });
      return;
    }

    this.setState({ loading: true }, this.calculateInvestment());
  }

  redo() {
    document.getElementById("time_dropdown").selectedIndex = 0;
    this.setState({
      show_result: false,
      interest: 0,
      investment: 0,
      monthly: 0,
    });
  }

  getColor(type) {
    if (type === 1 && this.state.type === "table") return "bolder";
    if (type === 2 && this.state.type === "chart") return "bolder";

    return "normal";
  }

  setOption = () => {
    let type;
    this.state.type === "table" ? (type = "chart") : (type = "table");

    this.setState({
      type,
    });
  };

  calculateInvestment() {
    let option = document.getElementById("time_dropdown");
    let selected_time = option.options[option.selectedIndex].value;

    let total = {};
    let { investment, monthly } = this.state;
    let interest = 1 + this.state.interest / 100 / 12;

    let totalArray = [];
    let initial_investment = investment;

    // Get my monthly return
    for (let i = 0; i < selected_time; i++) {
      let month = i + 1;
      let savings = +initial_investment + +monthly * i;

      if (i !== 0) investment = +investment * +interest;
      else investment = +investment;

      if (monthly !== 0 && i !== 0) investment = +investment + +monthly;

      if (!total[month]) {
        total[month] = { investment, savings };
      }
    }

    let monthNo = 1;
    let year = 0;

    for (let element in total) {
      totalArray.push({ month: total[element], monthNo, year });
      monthNo++;
      if (monthNo % 12 === 0) year++;
    }

    this.setState(
      {
        show_result: true,
        results: totalArray,
        warning: false,
        loading: false,
        type: "table",
      },
      // Fallback
      () => {
        if (this.state.loading) {
          this.setState({ loading: false });
        }
      }
    );
  }

  render() {
    let loading = this.state.loading ? (
      <div className="loading">
        <div className="rotate-center">
          <Logo />
        </div>
      </div>
    ) : (
      " "
    );

    let chartOrTable =
      this.state.type === "table" ? (
        <Table
          results={this.state.results}
          redo={() => this.redo()}
          loadingState={() => this.setLoading()}
        />
      ) : (
        <Charts chartDate={this.state.results} />
      );

    let table = this.state.show_result ? (
      <React.Fragment>
        <div className="button-selection">
          <button
            onClick={this.setOption}
            style={{ fontWeight: this.getColor(1) }}
          >
            Tabla
          </button>
          <button
            onClick={this.setOption}
            style={{ fontWeight: this.getColor(2) }}
          >
            Gráfica
          </button>
        </div>
        {chartOrTable}
      </React.Fragment>
    ) : (
      " "
    );

    let warning = this.state.warning
      ? "Por favor completa todos los campos"
      : " ";
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div id="send-form">
          <h1>iNBERSUS</h1>
          <p>1.-Selecciona una inversión inicial</p>
          <p className="initial">
            <span>$ &nbsp;</span>
            <input
              type="number"
              value={this.state.investment}
              onChange={($event) => this.handleChange($event)}
            />
          </p>
          <p>2.-Elige un tiempo de inversión.</p>
          <p>
            <select name="time" id="time_dropdown">
              {this.state.periods.map((option) => (
                <option key={option}>{option === 0 ? "Meses" : option}</option>
              ))}
              ;
            </select>
          </p>
          <p>3.-Selecciona tasa de interés anual (1-30)</p>
          <p className="interest">
            <input
              type="number"
              value={this.state.interest}
              onChange={($event) => this.handleInterest($event)}
            />
            <span>%</span>
          </p>
          <p>(Opcional) Déposito mensual.</p>
          <p className="monthly">
            <span>$ &nbsp;</span>
            <input
              type="number"
              value={this.state.monthly}
              onChange={($event) => this.handleMonth($event)}
            />
          </p>
          <p>
            <button onClick={() => this.startLoading()}>CALCULAR</button>
          </p>
          <p className="warning"> {warning} </p>
          {loading}
          {table}
        </div>
        <Welcome />
      </Animated>
    );
  }
}

export default Main;
