import "./widget.scss"
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';

const Widget = ({ type, amount, onclick }) => {

  let data;

  switch (type) {
    case "user":
      data = {
        title: "ADMINISTRADORES:",
        amount: amount,
        link: '',
        icon: (
          <PeopleIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "teacher":
      data = {
        title: "PROFESORES:",
        amount: amount,
        link: '',
        icon: (
          <AssignmentIndIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "student":
      data = {
        title: "ESTUDIANTES:",
        amount: amount,
        link: '',
        icon: (
          <SchoolIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "period":
      data = {
        title: "PERIODO ESCOLAR",
        amount: amount,
        onClick: onclick,
        link: 'Cargar',
        icon: (
          <AutoModeOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "lapse":
      data = {
        title: "LAPSO",
        amount: amount,
        onClick: onclick,
        link: 'Cargar',
        icon: (
          <AutoModeOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "grade":
      data = {
        title: "GRADO",
        amount: amount,
        onClick: onclick,
        link: 'Cargar',
        icon: (
          <AutoModeOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "section":
      data = {
        title: "SECCIÓN",
        amount: amount,
        onClick: onclick,
        link: 'Cargar',
        icon: (
          <AutoModeOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "students":
      data = {
        title: "ESTUDIANTES",
        amount: amount,
        onClick: onclick,
        link: 'Cargar',
        icon: (
          <AutoModeOutlinedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff"}} />
        )
      }
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link" onClick={onclick}>{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  )
}

export default Widget