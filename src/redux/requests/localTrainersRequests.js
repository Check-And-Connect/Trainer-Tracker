import axios from 'axios';

export function callAllLocalTrainers() {
    return axios.get('api/local_trainers')
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            
        })
    
}