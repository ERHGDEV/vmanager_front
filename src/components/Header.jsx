const Header = ({ isLogged, onLogout }) => {
    return (
        <header className="flex w-full justify-between" >
            <h1 className="text-2xl text-gray-200" >V Manager</h1>

            {isLogged && (
                <button
                    onClick={onLogout}
                    className="
                        bg-gray-200 text-cyan-950 
                        hover:bg-white focus:ring-2 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg 
                        text-md px-5 py-2.5 text-center"
                >
                    Cerrar sesión
                </button>
            )}
        </header>
    )
}

export default Header