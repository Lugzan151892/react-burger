const API_URL = 'https://norma.nomoreparties.space/api';
const wsUrl = 'wss://norma.nomoreparties.space/orders';

function checkResponse (res: any) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

async function request (url: string, options?: any) {
    return fetch(url, options).then(checkResponse)
}

function checkIsChanged(arr1: Array<string>, arr2: Array<string>) { 
  for(let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return true;
  }
  return false;
}

function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      // eslint-disable-next-line
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name: string, value: string, options?: any) {
    options = {
      path: '/',
      ...options
    };
    
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
}

function deleteCookie (name: string) {
  setCookie(name, "", {
    'max-age': -1
  })
}

const notForAuthUsers = ['/register', '/forgot-password', '/reset-password', '/login'];

export { request, getCookie, API_URL, wsUrl, setCookie, deleteCookie, checkIsChanged, notForAuthUsers};
