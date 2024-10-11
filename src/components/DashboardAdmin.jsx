import TableAdmin from "./TableAdmin"

const DashboardAdmin = ({ token, handleNotification }) => {
  return (
    <div className="max-w-6xl mx-auto">
        <h1 className="pt-8 pb-4 font-bold">Dashboard Administrador</h1>

        <TableAdmin 
            handleNotification={handleNotification}
            token={token} />
    </div>
  )
}

export default DashboardAdmin