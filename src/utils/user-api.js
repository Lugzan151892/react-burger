import {request, API_URL} from './data.js'

const registerUser = async (url, formData) => {
    return await request(`${API_URL}/${url}`, {
        method: 'POST',               
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password,
            "name": formData.name
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

const getUserData = async (url, token) => {
    return await request(`${API_URL}/${url}`, {
        method: 'GET',           
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },        
    });
}

const updateUserData = async (url, token, form) => {
    return await request(`${API_URL}/${url}`, {
        method: 'PATCH',        
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(form)
    })
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

const getNewAuthToken = async (url, token) => {
    return await request(`${API_URL}/${url}`, {
        method: 'POST',           
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": token
        }) 
    });
}

const userLogout = async (url, token) => {
    return await request(`${API_URL}/${url}`, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": token
        }) 
    })
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

export {registerUser, resetPassword, getNewAuthToken, getUserData, restorePassword, userLogout, login, updateUserData};
