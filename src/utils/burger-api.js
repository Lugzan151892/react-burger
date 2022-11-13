const API_URL = 'https://norma.nomoreparties.space/api';

async function getIngredients(url) {
    return fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

const getOrderDetails = (url, orderList) => {
    return fetch(url, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: orderList
        })        
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}


export {getIngredients, getOrderDetails, API_URL};