import TableAdmin from "./TableAdmin"

const DashboardAdmin = ({ token }) => {
  return (
    <div className="max-w-6xl mx-auto">
        <h1 className="pt-8 pb-4 font-bold">Dashboard Administrador</h1>

        <TableAdmin token={token} />
    </div>
  )
}

export default DashboardAdmin