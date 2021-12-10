import { request } from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request(`${baseUrl}/lists?where=shared%3D%221%22`)

export const getMine = (userId) => request(`${baseUrl}/lists?where=_userId%3D%22${userId}%22`)


export const getLikes = (listId) => request(`${baseUrl}/likes?where=listId%3D%22${listId}%22`)

export const create = async (listData, token) => {
    let response = await fetch(`${baseUrl}/lists`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...listData, likes: []})
    });

    let result = await response.json();

    return result;
};


export const update = async (listData, token) => {
    let response = await fetch(`${baseUrl}/lists/${listData._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(listData)
    });

    let result = await response.json();

    return result;
};

export const getOne = (listId) => {
    return fetch(`${baseUrl}/lists/${listId}`)
        .then(res => res.json())
};

export const del = (listId, token) => {
    return fetch(`${baseUrl}/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};

export const like = (listId, token) => {
    return fetch(`${baseUrl}/likes/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({listId})
    }).then(res => res.json());
};