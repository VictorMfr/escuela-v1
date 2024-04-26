import profilePic from './assets/profile-img.png'

export const userCols = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'cedula', headerName: 'Cedula', width: 120 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={profilePic} alt="avatar" />
          <span>{params.row.nombre || ''}</span>
        </div>
      )
    }
  },
  {
    field: 'apellidos',
    headerName: 'Apellidos',
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <span>{params.row.apellido1 || ''} {params.row.apellido2 || ''}</span>
        </>
      )
    }
  },
  { field: 'email', headerName: 'Email', width: 150 }
];

export const userRows = [
  { id: 1, email: '', nombre: 'Snow', apellido1: 'Jon', cedula: 35 },
  { id: 2, email: '', nombre: 'Lannister', apellido1: 'Cersei', cedula: 42 },
  { id: 3, email: '', nombre: 'Lannister', apellido1: 'Jaime', cedula: 45 },
  { id: 4, email: '', nombre: 'Stark', apellido1: 'Arya', cedula: 16 },
  { id: 5, email: '', nombre: 'Targaryen', apellido1: 'Daenerys', cedula: 45 },
  { id: 6, email: '', nombre: 'Melisandre', apellido1: null, cedula: 150 },
  { id: 7, email: '', nombre: 'Clifford', apellido1: 'Ferrara', cedula: 44 },
  { id: 8, email: '', nombre: 'Frances', apellido1: 'Rossini', cedula: 36 },
  { id: 9, email: '', nombre: 'Roxie', apellido1: 'Harvey', cedula: 65 },
];