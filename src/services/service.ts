import axios from "../../node_modules/axios/index"


const api = axios.create({
    baseURL: 'https://sportmap.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const consultar = async (url: string, setDados: Function) => {
    const resposta = await api.get(url)
    setDados(resposta.data)
}

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export default api;