import {request, API_URL} from './data.js'

const registerUser = async (url, name, email, password) => {
    return await request(`${API_URL}/${url}`, {
        method: 'POST',               
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        })
    });
}

const login = async (url, email, password) => {
    return await request(`${API_URL}/${url}`, {
        method: 'POST',           
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
            "email": email,
            "password": password,            
        }) 
    });
}

const restorePassword = async (url, email) => {
    return await request(`${API_URL}/${url}`, {
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
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

export {registerUser, resetPassword, restorePassword, login};
