const API_URL = 'https://norma.nomoreparties.space/api';

async function getIngredients(url) {
    return await fetch(`${API_URL}/${url}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

const getOrderDetails = async (url, orderList) => {
    return await fetch(`${API_URL}/${url}`, {
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