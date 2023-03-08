import { TFormData } from '../services/types/data.js';
import {request, API_URL} from './data'

const registerUser = async (url: string, formData: TFormData) => {
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

const login = async (url: string, email: string, password: string) => {
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

const getUserData = async (url: string, token: string) => {
    return await request(`${API_URL}/${url}`, {
        method: 'GET',           
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },        
    });
}

const updateUserData = async (url: string, token: string, form: TFormData) => {
    return await request(`${API_URL}/${url}`, {
        method: 'PATCH',        
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(form)
    })
}

const restorePassword = async (url: string, email: string) => {
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

const getNewAuthToken = async (url: string, token: string) => {
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

const userLogout = async (url: string, token: string) => {
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

const resetPassword = async (url: string, password: string, token: string) => {
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
