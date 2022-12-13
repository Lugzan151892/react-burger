const API_URL = 'https://norma.nomoreparties.space/api';

async function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

async function getIngredients(url) {
    return await request(`${API_URL}/${url}`);
}

const getOrderDetails = async (url, orderList) => {
    return await request(`${API_URL}/${url}`, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: orderList
            })        
        });
}


export {getIngredients, getOrderDetails, API_URL};
