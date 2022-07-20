import { React, useState } from "react";

export default function Login({ isOpen, handleLogin, errorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function inputEmail(event) {
    setEmail(event.target.value);
  }

  function inputPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleLogin(password, email);
  }

  return (
    <section className={`popup ${isOpen && "popup_enable"} popup_auth`}>
      <div className={"popup__container popup__container_auth"}>
        <h2 className={"popup__title popup__title_auth"}>Вход</h2>
        <form className="popup__form" name="login" onSubmit={handleSubmit}>
          <input
            className="popup__input popup__input_auth"
            onChange={inputEmail}
            name="email"
            type="text"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error">{errorMessage}</span>
          <input
            className="popup__input popup__input_auth"
            onChange={inputPassword}
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error">{errorMessage}</span>
          <button className={"popup__save popup__save_auth"} type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
