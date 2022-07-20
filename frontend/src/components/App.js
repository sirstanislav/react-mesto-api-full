import React, { useEffect, useState, } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(true);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopup, setConfirmDeletePopupOpen] = useState(false);
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(`Ошибка статуса лайка: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setConfirmDeletePopupOpen(false);
    setIsInfoTooltip(false);
  }

  function handleCardClick(data) {
    setSelectedCard({
      isOpen: true,
      ...data,
    });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка редактирования профиля: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(`Ошибка загрузки аватара: ${err}`));
  }

  function handleLogin(password, email) {
    return Auth.autorisation(password, email)
      .then((data) => {
        console.log('Front: handleLogin: TOKEN', data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setEmail(email)
          setIsUserLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log("Ошибка авторизации:");
        setErrorMessage(error.message);
      });
  }

  function handleRegister(password, email) {
    return Auth.register(password, email)
      .then(() => {
        history("/sing-in"); //Если форма отправлена успешна, перенаправим пользователя на страницу авторизации.
      })
      .catch((error) => {
        console.log("Ошибка регистрации:");
        setErrorMessage(error.message);
      });
  }

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      console.log('LocalStorage', localStorage.getItem("jwt"));
      const jwt = localStorage.getItem("jwt");
      setToken(jwt);
      Auth.token(jwt)
        .then((res) => {
          console.log('checkToken() => res.data.email:', res.data.email);
          if (res) {
            const userData = {
              email: res.data.email,
            };
            setEmail(userData.email);
            setIsUserLoggedIn(true);
          }
        })
        .catch((err) => console.log(`Ошибка токена: ${err}`));
    }
  }

  function handleSignOut() {
    setIsUserLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    console.log('Status isUserLoggedIn:',isUserLoggedIn);
    if (isUserLoggedIn) {
      api
        .getCardList()
        .then((res) => {
          console.log('Status res getCardList:', res);
          setCards(res);
        })
        .catch((err) => console.log(`Ошибка загрузки карточек: ${err}`));

      api
        .getUserInfo(token)
        .then((res) => {
          console.log('Status res getUserInfo:', res);
          setCurrentUser(res);
        })
        .catch((err) =>
          console.log(`Ошибка получения информации профиля: ${err}`)
        );
      history("/");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute loggedIn={isUserLoggedIn} path="*">
                <Header
                  email={email}
                  link="/"
                  button="Выйти"
                  handleSignOut={handleSignOut}
                />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Login
                  isOpen={isLoginPopupOpen}
                  handleLogin={handleLogin}
                  errorMessage={errorMessage}
                />
                <Header link="/sign-up" button="Регистрация" />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Register
                  isOpen={isRegisterPopupOpen}
                  handleRegister={handleRegister}
                  errorMessage={errorMessage}
                />
                <Header link="/sign-in" button="Войти" />
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopup}
          onClose={handleCloseAllPopups}
          onDelete={setConfirmDelete}
        />
      </CurrentUserContext.Provider>

      <InfoTooltip isOpen={isInfoTooltip} onClose={handleCloseAllPopups} />
      <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />
    </div>
  );
}

export default App;
