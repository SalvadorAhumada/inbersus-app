import React, { useState } from "react";
import { Animated } from "react-animated-css";
import "../style/newInvestment.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import NumberFormat from "react-number-format";

const NewInvestements = (props) => {

    const [visible, setVisible] = useState(true);

    const onSelect = e => {
        props.setOptionCallback(e.value, props.index)
    }
    const closeInvestment = () => {
        setVisible(false);
        setTimeout(() => {
            props.deleteCallback(props.index);
        }, 700);
    }

    const sendData = e => {
        console.log(e.target.value.replace(/^\D+/g, "").slice(0, e.target.value.length - 1))
    }

    const investment = props.selectedOption ? <div className="body-container">
        <p> Inversion inicial</p>
        <NumberFormat
            placeholder="Max. $199 999"
            prefix={"$"}
            onChange={sendData}
            format={'$ ### ###'}
        />
    </div> : <div style={{ position: "relative" }}></div>

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={visible}>

            <div className="first_step center">

                <i className="material-icons close" onClick={closeInvestment}>close</i>

                <div className="header-container">
                    {investment}
                </div>
                <div className="options-container">
                    <p>Opciones extras:</p>
                </div>
            </div>

        </Animated>
    );
};

export default NewInvestements;
