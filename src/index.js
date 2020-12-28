import React from "react"
import ReactDOM from "react-dom"
import App from './App';
import { InvestmentProvider } from "./context/investmentContext";

ReactDOM.render(<InvestmentProvider>
    <App />
</InvestmentProvider>, document.getElementById("root"))