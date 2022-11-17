const API_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

async function getIngredients(url) {
    return await fetch(`${API_URL}/${url}`)
        .then(checkResponse)
        .catch(err => console.log(err))
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
        .then(checkResponse)
        .catch(err => console.log(err))
}


export {getIngredients, getOrderDetails, API_URL};