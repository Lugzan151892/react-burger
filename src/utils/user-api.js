import {request, API_URL} from './data.js'

const restorePassword = async (url, password) => {
    return await request(`${API_URL}/${url}`, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": password
            })        
        });
}

const resetPassword = async (url, password, token) => {
    return await request(`${API_URL}/${url}`, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "token": token
            })        
        });
}

export {resetPassword, restorePassword};
