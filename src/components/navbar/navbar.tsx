import { useState } from "react";
import { Link, To, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (path: To) => {
    navigate(path);
    closeMenu(); // Fecha o menu ao clicar em um link
  };

  return (
    <>
      <div className='bg-custom-dark-blue text-white p-4 flex justify-between items-center font-bold'>
        <div className="text-lg ml-10">
          <Link to='/home' className="text-2xl">Sport Maps</Link>
        </div>

        <div className='hidden md:flex gap-5 justify-center flex-grow'>
          <Link to='/home' className='hover:underline'>Início</Link>
          <Link to='/contato' className='hover:underline'>Contato</Link>
        </div>

        <div className='hidden md:flex gap-4'>
          <button className='hover:underline bg-white text-black rounded-full w-28 p-2'>
            <Link to='/login'>Login</Link>
          </button>
          <button className='hover:underline bg-white text-black rounded-full w-28 p-2'>
            <Link to='/cadastro'>Cadastre-se</Link>
          </button>
        </div>

        <button className='md:hidden text-white text-4xl' onClick={toggleMenu}>
          &#9776; {/* Código para o ícone do botão hamburger */}
        </button>
      </div>

      {isMenuOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50' onClick={closeMenu}>
          <div className='bg-custom-dark-blue text-white w-1/2 h-full absolute right-0 p-4' onClick={e => e.stopPropagation()}>
            <div className='flex flex-col font-bold'>
              <Link to='/home' className='py-2 hover:underline' onClick={() => handleLinkClick('/home')}>Início</Link>
              <Link to='/contato' className='py-2 hover:underline' onClick={() => handleLinkClick('/contato')}>Contato</Link>
              <Link to='/login' className='py-2 hover:underline' onClick={() => handleLinkClick('/login')}>Login</Link>
              <Link to='/cadastro' className='py-2 hover:underline' onClick={() => handleLinkClick('/cadastro')}>Cadastre-se</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
