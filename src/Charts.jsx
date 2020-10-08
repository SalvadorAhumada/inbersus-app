import React, { Component } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      invested: [],
      total: [],
      totalInvested: [],
      scree_size: "1200px",
    };
  }

  componentDidMount() {
    this.getInvestment();

    if (window.innerWidth < 800) this.setState({ screen_size: null });
  }

  getInvestment = () => {
    let invested = [];
    let saved = [];
    let total = [];
    let totalInvested = [];

    this.props.chartDate.forEach((month, index) => {
      let investment = parseInt(month.month.investment.toFixed(2));
      totalInvested.push({ y: investment, label: `Mes ${index}` });
      invested.push({
        y: investment - month.month.savings,
        label: `Mes ${index}`,
      });
      saved.push({ y: month.month.savings, label: `Mes ${index}` });
      total.push({
        y: investment + month.month.savings,
        label: `Mes ${index}`,
      });
    });

    this.setState({ invested, saved, total, totalInvested });
  };

  render() {
    const options = {
      animationEnabled: true,
      width: this.screen_size,
      // title: {
      //     text: "Number of New Customers"
      // },
      axisY: {
        title: "Pesos",
        includeZero: false,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: "Ahorrado",
          showInLegend: true,
          dataPoints: this.state.saved,
        },
        {
          type: "spline",
          name: "Retorno",
          showInLegend: true,
          dataPoints: this.state.invested,
        },
        {
          type: "spline",
          name: "Total",
          showInLegend: true,
          dataPoints: this.state.totalInvested,
        },
      ],
    };

    return (
      <div className="chart-container">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default Charts;
