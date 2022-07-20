import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = isOwn ? "card__delete-button" : "";

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = isLiked
    ? "card__navigation-like_dark"
    : "card__navigation-like";

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="card__navigation">
        <h2 className="card__navigation-title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
          aria-label="Отметка нравится"
        ></button>
        <span className="card__like-count">{card.likes.length}</span>
      </div>
      <div
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></div>
    </article>
  );
}

export default Card;
