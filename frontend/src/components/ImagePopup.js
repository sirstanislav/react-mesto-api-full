function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_image-view ${card.isOpen && "popup_enable"}`}
    >
      <div className="popup__image">
        <img className="popup__image-full" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
        <button
          className="popup__close popup__close_image"
          onClick={onClose}
          type="reset"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
