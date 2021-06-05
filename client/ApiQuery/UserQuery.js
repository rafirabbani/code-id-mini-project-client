import axios from 'axios';

const createUser = async (data) => {
    try{
        const result = await axios.post('/api/users/create', data)
        return result
    }
    catch (err) {
        return await err
    }
}

export default {
    createUser
}