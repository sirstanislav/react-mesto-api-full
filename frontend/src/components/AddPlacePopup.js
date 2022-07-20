import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function inputName(e) {
    setName(e.target.value);
  }

  function inputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-image"
      title="Новое место"
      container=""
    >
      <input
        className="popup__input"
        onChange={inputName}
        value={name}
        name="image-name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error"></span>
      <input
        className="popup__input"
        onChange={inputLink}
        value={link}
        name="image-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error"></span>
      <button className={"popup__save"} type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}
