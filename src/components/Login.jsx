import { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(username, password)
    }

    return (
        <form
            onSubmit={handleSubmit} 
            autoComplete='off' 
            className="max-w-sm mx-auto mt-48"
        >
            <p className='text-xl mb-5'>Inicia sesión</p>
            <div className="relative z-0 w-full mb-5 group">
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="
                        block py-2.5 px-0 w-full 
                        text-md bg-transparent 
                        border-0 border-b-2 border-gray-500 
                        appearance-none 
                        focus:outline-none focus:ring-0 
                        focus:border-gray-100 peer" 
                    placeholder=" " 
                    required 
                />
                <label 
                    htmlFor='username'
                    className="
                        absolute text-md 
                        text-gray-400 duration-300 
                        transform -translate-y-6 scale-90 top-3 -z-10 
                        origin-[0] peer-focus:start-0 
                        rtl:peer-focus:translate-x-1/2 
                        rtl:peer-focus:left-auto peer-focus:text-gray-100 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-90 peer-focus:-translate-y-6"
                    >
                        Nombre de usuario
                    </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        block py-2.5 px-0 w-full 
                        text-md bg-transparent 
                        border-0 border-b-2 border-gray-500 
                        appearance-none 
                        focus:outline-none focus:ring-0 
                        focus:border-gray-100 peer" 
                    placeholder=" " 
                    required 
                />
                <label 
                    htmlFor='password'
                    className="
                        absolute text-md 
                        text-gray-400 duration-300 
                        transform -translate-y-6 scale-90 top-3 -z-10 
                        origin-[0] peer-focus:start-0 
                        rtl:peer-focus:translate-x-1/2 
                        rtl:peer-focus:left-auto peer-focus:text-gray-100 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-90 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
            </div>

            <button 
                type="submit" 
                className="bg-gray-200 text-cyan-950 
                hover:bg-white focus:ring-2 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg 
                text-md w-full px-5 py-2.5 text-center mt-5"
            >
                Entrar
            </button>
        </form>
    )
}

export default Login