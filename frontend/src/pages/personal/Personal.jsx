import './personal.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import DataTable from '../../components/datatable/DataTable'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react';
import { getPersonalRequest } from '../../api/personal';


const Personal = () => {

  const [tableRows, setTableRows] = useState([])
  const tableCols = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre y Apellido', width: 120 },
    { field: 'email', headerName: 'Email', width: 150 }
  ];

  useEffect(() => {
    setTableRows(getPersonalRequest())
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Personal Administrativo"
          tableCols={tableCols}
          tableRows={tableRows}
          createUrl="/direccion/create" />
      </div>
    </div>
  )
}

export default Personal