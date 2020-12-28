import React, { createContext } from "react";

const InvestmentInformation = createContext({});

class InvestmentProvider extends React.Component {
    state = {
        investment: {
            name: null,
            rate: 0,
            initial: 0,
            monthly: 0,
            tool: null,
            months: 0
        },
        totalInvestments: []
    };

    render() {
        const { children } = this.props;

        return (
            <InvestmentInformation.Provider investment={this.state.investment}>
                {children}
            </InvestmentInformation.Provider>
        );
    }
}

export default InvestmentInformation;
export { InvestmentProvider };
