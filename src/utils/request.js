 import axios from 'axios';

const request = axios.create({
    baseURL:'http://localhost:2003/api'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });


export default request;








