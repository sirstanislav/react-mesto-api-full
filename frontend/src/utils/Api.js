class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  setUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  setUserAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getCardList(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + token
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeLikeCardStatus(id, isLiked, token) {
    return isLiked
      ? fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "PUT",
          headers: {
            ...this._headers,
            authorization: 'Bearer ' + token
          },
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      : fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          headers: {
            ...this._headers,
            authorization: 'Bearer ' + token
          },
        }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
}

export const api = new Api({
  baseUrl: "https://api.ctacleo.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});
