import {request, API_URL} from './data'

async function getIngredients(url: string) {
    return await request(`${API_URL}/${url}`);
}

const getOrderDetails = async (url: string, orderList: Array<string>, token: string) => {
    return await request(`${API_URL}/${url}`, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                ingredients: orderList
            })        
        });
}


export {getIngredients, getOrderDetails, API_URL};
