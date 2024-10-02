
import mapa from "../../assets/mapa-home.jfif"


const Home = () => {
    return (
        <>
        <div className="fundo-tela">
            <div className="flex justify-center">
              <div className='container grid grid-cols-2 text-white'>
                <div className="flex flex-col gap-4 items-center justify-center py-4 mt-8">
                  <h2 className='text-5xl font-bold ml-12'>Qual quadra você procura?</h2>
                </div>
              </div>
            </div>
            <div className='flex m-16'>
                <img src={mapa} alt="" className='w-2/3 ml-12'/>
                <div className='ml-48'>
                  <input type="text" placeholder='Digite a quadra' className='bg-white rounded-full p-1 text-black' />
                  <div className='flex justify-center mt-4 bg-white rounded-full'>
                    <button className='flex justify-center'>Buscar</button>
                  </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default Home