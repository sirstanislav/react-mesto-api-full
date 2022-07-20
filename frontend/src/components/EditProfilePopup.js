import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function inputName(e) {
    setName(e.target.value);
  }

  function inputDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      container=""
    >
      <input
        className="popup__input"
        value={name}
        onChange={inputName}
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error"></span>
      <input
        className="popup__input"
        value={description}
        onChange={inputDescription}
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error"></span>
      <button className={"popup__save"} type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
