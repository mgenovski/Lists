import { request } from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request(`${baseUrl}/lists`)

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

export const getOne = (listId) => {
    return fetch(`${baseUrl}/lists/${listId}`)
        .then(res => res.json())
};

export const destroy = (listId, token) => {
    return fetch(`${baseUrl}/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};

export const like = (listId, list, token) => {
    return fetch(`${baseUrl}/lists/${listId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(list)
    }).then(res => res.json());
};