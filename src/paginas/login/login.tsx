import { Link, useNavigate } from '../../../node_modules/react-router-dom/dist/index'


const Login = () => {
    let navigate = useNavigate()
    return (
        <div>
            <h2 className="text-slate-900 text-5xl   m-4">Login</h2>
            <div>
                <button type='submit'
                    onClick={() => { navigate('/home') }}
                    className='hover:underline mx-4'>
                    Login
                </button>
                <Link to='/home' className='hover:underline  mx-4'>Login</Link>
            </div>
        </div>
    )
}

export default Login