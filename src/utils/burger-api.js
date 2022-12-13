import {request, API_URL} from './data.js'

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
