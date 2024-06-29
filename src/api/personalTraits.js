import axios from './axios'

export const getPersonalTraitsRequest = (token) => axios.get('personalTraits', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const getPersonalTraitRequest = (token, id) => axios.get(`personalTraits/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createPersonalTraitRequest = (token, personalTrait) => axios.post(
    'personalTrait', personalTrait, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const deletePersonalTraitRequest = (token, id) => axios.delete(
    `personalTraits/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
