import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.83:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log(token);
        if(token){
            config.headers.Authorization = `${token}`;
        }
        return config;
    }, (error) => Promise.reject(error)
)

const sheets = {
    getUsers:()=>api.get("user"),
    getEvents:()=> api.get("evento"),
    postLogin:(user) => api.post("login/", user),
    deleteUser:(id)=> api.delete("user/" + id),
    deleteEvent:(id)=> api.delete('evento/'+ id),
    createIngresso: (ingresso) => api.post("/ingresso", ingresso),

    createEvento: (form, imagem) => {
        const data = new FormData();
        for (let key in form) data.append(key, form[key]);
        if(imagem) data.append("imagem", imagem);

        return api.post("/evento", data, {
            header:{
                "Content-Type":"multpart/form-data",
                Accept:"application/json",
            }
        })
    }
}

export default sheets;