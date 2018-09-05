import axios from 'axios';

export function callAllLocalTrainers() {
    return axios.get('api/localTrainers')
        .then(res => res.data)
        .catch(err => {
            console.log(err);
        })
}