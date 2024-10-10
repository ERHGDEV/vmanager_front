import formatFecha from '../utils/formatDate'
import EditIcon from './icons/EditIcon'
import AddForm from './AddForm'
import { useEffect, useState } from 'react'

const TableAdmin = ({ token }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])
    
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                throw new Error('No se pudieron obtener los usuarios')
            }
        } catch (error) {
            console.error('Error fetching users: ', error)
            alert('No se pudieron obtener los usuarios')
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <AddForm token={token} fetchUsers={fetchUsers} />

            <div className="pb-4 pt-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-cyan-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="table-search" 
                        className="
                            block ps-10 text-md px-5 py-2.5 text-gray-900 rounded-lg w-80 bg-gray-50" 
                        placeholder="Busqueda"
                    ></input>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-gray-200 uppercase bg-gray-950">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ingreso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Puesto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Unidad de negocio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Saldo Vacaciones
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="bg-gray-700 border-b hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-white">
                                {user.username}
                            </th>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {formatFecha(user.entry)}
                            </td>
                            <td className="px-6 py-4">
                                {user.position}
                            </td>
                            <td className="px-6 py-4">
                                {user.businessUnit}
                            </td>
                            <td className="px-6 py-4">
                                {user.vacationDays}
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <button>
                                        <EditIcon />
                                        <span className="sr-only">Editar</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableAdmin