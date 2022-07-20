function PopupWithForm({
  name,
  isOpen,
  container,
  title,
  onClose,
  children,
  onSubmit,
  popup__close_none,
}) {
  return (
    <section className={`popup ${isOpen && "popup_enable"}`}>
      <div className={`popup__container ${container}`}>
        <h2 className={"popup__title"}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
        </form>
        <button
          style={popup__close_none}
          className="popup__close"
          onClick={onClose}
          type="reset"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
