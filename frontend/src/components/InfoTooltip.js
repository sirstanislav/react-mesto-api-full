import React from "react";

export default function InfoTooltip({ isOpen, onClose }) {
  return (
    <section className={`popup ${isOpen && "popup_enable"}`}>
      <div className={"popup__container"}>
        <div className="popup__fail"></div>
        <h2
          className={"popup__title"}
          style={{ width: 358, textAlign: "center", marginTop: 32 }}
        >
          Что-то пошло не так! Попробуйте ещё раз.
        </h2>

        <button
          className="popup__close"
          onClick={onClose}
          type="reset"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}
