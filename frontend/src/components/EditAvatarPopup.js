import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="update-avatar"
      title="Обновить аватар"
      container="popup__container_update-avatar"
    >
      <input
        className="popup__input"
        ref={inputRef}
        name="update-avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error"></span>
      <button className={"popup__save"} type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
