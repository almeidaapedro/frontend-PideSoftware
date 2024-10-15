import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom"
import "./navbar.css"


function Navbar() {

    return (
        <>
            <div className='bg-custom-dark-blue text-white p-12 m-auto flex justify center font-bold'>
                <div className="text-lg">
                    <Link to='/home' className="text-2xl">Sport Maps</Link>
                </div>

                <div className='flex gap-5 font-bold justify-center m-auto'>
                    <Link to='/home' className='hover:underline'>Início</Link>
                    <Link to='/contato' className='hover:underline'>Contato</Link>
                </div>
                <div className=''>
                    <button className='hover:underline bg-white text-black rounded-full w-28 p-2 mr-4'><Link to='/login'>Login</Link></button>
                    <button className='hover:underline bg-white text-black rounded-full w-28 p-2'><Link to='/cadastro'>Cadastre-se</Link></button>
                </div>
            </div>
        </>
    )
}

export default Navbar