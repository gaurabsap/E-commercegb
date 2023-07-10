import axios from "axios";

const url = "http://127.0.0.1:3000/api/v1"


const Api = () => {
    axios.create({
        baseURL: url
    })
}

export default Api;