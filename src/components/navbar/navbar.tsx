import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom"


function Navbar() {

    return (
        <>
            <div className='w-full bg-indigo-900 text-white flex justify-center py-5'>
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Sport Maps</Link>
                </div>

                <div className='flex gap-4'>
                    <Link to='/' className='hover:underline'>Início</Link>
                    <Link to='/' className='hover:underline'>Suporte</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar