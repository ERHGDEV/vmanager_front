import { useState, useEffect } from 'react'
import AddIcon from './icons/AddIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'

const AddForm = ({ token, fetchUsers, handleNotification }) => {
    const [showForm, setShowForm] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: 'user',
        entry: '',
        position: '',
        businessUnit: '',
        vacationDays: 0,
        usedDays: 0
    })

    const [isFormValid, setIsFormValid] = useState(false)

    const handleSave = async () => {
        if (isFormValid) {
            try {
                const response = await fetch('http://localhost:5000/api/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(newUser),
                })
                if (response.ok) {
                  fetchUsers()
                  setNewUser({ username: '', password: '', role: 'user', vacationDays: 0, usedDays: 0 })

                  handleNotification('Usuario agregado', 'success')
                } else {
                  throw new Error('Failed to add user')
                }
              } catch (error) {
                console.error('Error adding user:', error)
                handleNotification('No se pudo agregar el usuario', 'error')
            }
            setShowForm(false)
        }
    }

    useEffect(() => {
        const requiredFields = [
            newUser.username,
            newUser.password,
            newUser.role,
            newUser.entry,
            newUser.position,
            newUser.businessUnit
        ]
        const allFieldsFilled = requiredFields.every(field => field.trim() !== '')
        setIsFormValid(allFieldsFilled)
    }, [newUser])

    return (
        <>
            <button
                className="bg-gray-200 text-cyan-950 
                hover:bg-white focus:ring-2 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg 
                text-md px-5 py-2.5 text-center"
                onClick={() => setShowForm(true)}
            >
                <AddIcon />
            </button>

            {showForm && (
                <div className="fixed inset-0 z-10 flex 
                    items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-cyan-950 rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Agregar usuario</h2>
                        <form autoComplete='off' className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Nombre de Usuario:
                                    <input
                                        type="text"
                                        name="username"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.username}
                                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Contraseña:
                                    <input
                                        type="password"
                                        name="password"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Rol:
                                    <input
                                        type="text"
                                        name="role"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Fecha de Ingreso:
                                    <input
                                        type="date"
                                        name="entry"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.entry}
                                        onChange={(e) => setNewUser({ ...newUser, entry: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Posición:
                                    <input
                                        type="text"
                                        name="position"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.position}
                                        onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Unidad de Negocio:
                                    <input
                                        type="text"
                                        name="businessUnit"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.businessUnit}
                                        onChange={(e) => setNewUser({ ...newUser, businessUnit: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Días de Vacaciones:
                                    <input
                                        type="number"
                                        name="vacationDays"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.vacationDays}
                                        onChange={(e) => setNewUser({ ...newUser, vacationDays: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium ">
                                    Días Usados:
                                    <input
                                        type="number"
                                        name="usedDays"
                                        className="pt-1 pb-1 mt-1 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm text-cyan-950 pl-2"
                                        value={newUser.usedDays}
                                        onChange={(e) => setNewUser({ ...newUser, usedDays: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-cyan-950 
                                    focus:ring-2 focus:outline-none 
                                    focus:ring-blue-300 font-medium rounded-lg 
                                    text-md px-5 py-2.5 text-center hover:bg-green-600 hover:text-gray-50"
                                    onClick={handleSave}
                                    disabled={!isFormValid}
                                >
                                    <SaveIcon />
                                    <span className='sr-only'>Guardar</span>
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-200 text-cyan-950 
                                        focus:ring-2 focus:outline-none 
                                        focus:ring-blue-300 font-medium rounded-lg 
                                        text-md px-5 py-2.5 text-center hover:bg-red-600 hover:text-gray-50"
                                    onClick={() => setShowForm(false)}
                                >
                                    <CancelIcon />
                                    <span className='sr-only'>Cancelar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddForm
