import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getUsers:()=>api.get("user"),
    getEvents:()=> api.get("evento"),
    postLogin:(user) => api.post("login/", user),
    deleteUser:(id)=> api.delete("user/" + id),
    deleteEvent:(id)=> api.delete('evento/'+ id),
}

export default sheets;