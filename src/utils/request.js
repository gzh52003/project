import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:27017/api'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });


export default request;