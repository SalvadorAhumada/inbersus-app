import React, { useState } from "react";
import { Animated } from "react-animated-css";

const Welcome = (props) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={visible}>
      <section className="welcome_modal_wrapper">
        <div className="welcome_modal">
          <h3 className="center">¡BIENVENIDO A iNBERSUS!</h3>
          <p>
            Esta aplicación web te ayuda a generar simulaciones de inversiones.
            Toda la información presentada es con fines unicamente informativos
            sin ningún tipo de garantía.{" "}
          </p>
          <p className="center">
            <button className="ok_button bold_text" onClick={closeModal}>
              ACEPTAR
            </button>
          </p>
          <footer></footer>
        </div>
      </section>
    </Animated>
  );
};

export default Welcome;
