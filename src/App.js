import React, { useState } from "react";
import InstructionsModal from "./InstructionsModal";
import Investments from "./components/Investments";
import { InvestmentProvider } from "./context/InvestmentContext";

export default function App() {
	const [investments, setInvestments] = useState([]);

  return (
    <div className="App">
    	<InvestmentProvider value={{investments, setInvestments}}>
    		<InstructionsModal />
    		<Investments />
    	</InvestmentProvider>
    </div>
  );
}