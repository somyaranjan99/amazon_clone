import axios from "axios";
const Instance= axios.create({
    baseURL: 'http://localhost:4001', 
    proxy: false  
});
export default Instance;