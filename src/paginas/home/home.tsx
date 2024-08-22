import React from "react";
import './home.css'

interface minhaProps {
    titulo: string;
    descricao: string;
}

function Home(props: minhaProps){
    return (
        <>
        <h2>{props.titulo}</h2>
        <p>{props.descricao}</p>
        </>
    );
}

export default Home;