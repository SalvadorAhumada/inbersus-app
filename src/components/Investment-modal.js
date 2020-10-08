import React, { useState } from "react";
import "../style/investmentmodal.css";
import { Animated } from "react-animated-css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Investmentmodal = () => {

    const [visible, setVisible] = useState(true);

    const [options] = useState([
        { name: "Prestadero", risk: "Medio-alto", roi: " 8.9%  - 28.9% " },
        { name: "Piggo", risk: "Bajo", roi: 'N-A' },
    ]);

    const [selectedOption, setSelection] = useState(null);

    const closeModal = () => {
        setVisible(false)
    }

    const handleOptions = option => {
        setSelection(option)
    }

    const confirmSelection = () => {
        if (!selectedOption) {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, elige una opcion para poder  continuar.',
                showConfirmButton: true,
            })

        }
    }

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={visible}>
            <section className="welcome_modal_wrapper">
                <div className="welcome_modal">
                    <div className="options_investment">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptions(option)}
                            >
                                <img className={selectedOption ? selectedOption.name == option.name ? 'selected_option' : null : null}
                                    src={`https://res.cloudinary.com/dp0yyyb2g/image/upload/v1590191615/${option.name.toLowerCase()}.jpg`} />
                            </div>
                        ))}
                    </div>
                    <h3 className="center">{selectedOption ? selectedOption.name : "Selecciona una opcion de inversion."}</h3>
                    <p><span>Riesgo:</span> {selectedOption ? selectedOption.risk : "-"}</p>
                    <p><span>Rendimiento:</span>{selectedOption ? selectedOption.roi : "-"}</p>
                    <p className="center">
                        <button className="ok_button bold_text" onClick={confirmSelection}>Aceptar</button>
                    </p>
                </div>
            </section>
        </Animated >
    );
};

export default Investmentmodal;
