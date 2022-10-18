import axios from "axios";
import { createContext, useEffect, useState } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {
    const [categoria, setCategoria] = useState("general")
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)




    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChange = (e, valor) => {
        setPagina(valor);
     }


    const apiKey = "f109690c8d0347ed99525236d34859b5"

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `
            https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`
            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPagina(1)
        }
        consultarAPI()
    },[categoria])

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `
            https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${apiKey}`
            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()
    },[pagina])
    return(
        <NoticiasContext.Provider
        value={{
            categoria,
            handleChangeCategoria,
            noticias,
            totalNoticias, 
            handleChange, 
            pagina
        }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext