import { useState, useEffect } from 'react'
import AddIcon from './icons/AddIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'

const AddForm = ({ token, fetchUsers }) => {
    const [showForm, setShowForm] = useState(false)
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: '',
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
                } else {
                  throw new Error('Failed to add user')
                }
              } catch (error) {
                console.error('Error adding user:', error)
                alert('Error adding user')
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
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Usuario</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre de Usuario:
                                    <input
                                        type="text"
                                        name="username"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.username}
                                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contraseña:
                                    <input
                                        type="password"
                                        name="password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Rol:
                                    <input
                                        type="text"
                                        name="role"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Fecha de Ingreso:
                                    <input
                                        type="date"
                                        name="entry"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.entry}
                                        onChange={(e) => setNewUser({ ...newUser, entry: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Posición:
                                    <input
                                        type="text"
                                        name="position"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.position}
                                        onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Unidad de Negocio:
                                    <input
                                        type="text"
                                        name="businessUnit"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.businessUnit}
                                        onChange={(e) => setNewUser({ ...newUser, businessUnit: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Días de Vacaciones:
                                    <input
                                        type="number"
                                        name="vacationDays"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.vacationDays}
                                        onChange={(e) => setNewUser({ ...newUser, vacationDays: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Días Usados:
                                    <input
                                        type="number"
                                        name="usedDays"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={newUser.usedDays}
                                        onChange={(e) => setNewUser({ ...newUser, usedDays: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    onClick={handleSave}
                                    disabled={!isFormValid}
                                >
                                    <SaveIcon />
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={() => setShowForm(false)}
                                >
                                    <CancelIcon />
                                    Cancelar
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
