import "./widget.scss"

const Widget = ({ type, amount, onclick }) => {

  let data;

  switch (type) {
    case "user":
      data = {
        title: "ADMINISTRADORES:",
        amount: amount,
        link: '',
      }
      break;
    case "teacher":
      data = {
        title: "PROFESORES:",
        amount: amount,
        link: '',

      }
      break;
    case "student":
      data = {
        title: "ESTUDIANTES:",
        amount: amount,
        link: '',

      }
      break;
    case "period":
      data = {
        title: "PERIODO ESCOLAR ACTUAL",
        amount: amount,
        onClick: onclick,
        link: 'Iniciar nuevo',

      }
      break;
    case "lapse":
      data = {
        title: "LAPSO ACTUAL",
        amount: amount,
        onClick: onclick,
        link: 'Iniciar nuevo',

      }
      break;
    case "periodData":
      data = {
        title: "INFORMACIÓN DEL PERIODO",
        amount: amount,
        onClick: onclick
      }
      break;
    case "grade":
      data = {
        title: "AGREGAR GRADOS",
        amount: amount,
        onClick: onclick,
        link: 'Nuevo en Lapso Actual',

      }
      break;
    case "section":
      data = {
        title: "AGREGAR SECCIONES",
        amount: amount,
        onClick: onclick,
        link: 'Nuevo en Lapso Actual',

      }
      break;
    case "students":
      data = {
        title: "ASIGNAR ESTUDIANTES",
        amount: amount,
        onClick: onclick,
        link: 'Nuevo en Lapso Actual',

      }
      break;

    case "representant":
      data = {
        title: "REPRESENTANTES:",
        amount: amount,
        onClick: onclick,
        link: '',

      }
      break;
    case "teacher":
      data = {
        title: "PROFESORES",
        amount: amount,
        onClick: onclick,
        link: '',

      }
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{maxWidth: data.title == "INFORMACIÓN DEL PERIODO" && data.amount? "60%": 168}}>
      <div className={data.title == "INFORMACIÓN DEL PERIODO" && data.amount? "": "left"}>
        <span className="title">{data.title}</span>
        {data.title != "INFORMACIÓN DEL PERIODO" && <span className="counter">{data.amount}</span>}
        {data.title == "INFORMACIÓN DEL PERIODO" && data.amount && (
          <ul className="periodDetails">
            {data.amount.map(lapse => (
              <li>
                <hr/>
                <br/>
                <p>LAPSO: {lapse.lapso}</p>
                <p>PROYECTO ESCOLAR: {lapse.proyectoEscolar}</p>
                <br/>
                <small>{lapse.grados.length > 0? "GRADOS:": "Sin datos"}</small>
                <ul>
                  {lapse.grados.map(grade => (
                    <li key={Math.random()}>
                      <small key={Math.random()}>GRADO {grade.grado}</small>
                      <br/>
                      {grade.secciones.length > 0? <small key={Math.random()}>SECCIONES:</small>: ""}
                      <ul key={Math.random()}>
                        {grade.secciones.map(section => (
                          <li key={Math.random()}>{section.seccion.toUpperCase()}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <br/>
              </li>   
            ))} 
          </ul>
        )}
        
        {data.link && <button className="link" onClick={onclick} style={{marginTop: data.amount? 21: 0}}>{data.link}</button>}
        {data.title == "INFORMACIÓN DEL PERIODO" && !data.amount && <p>No hay datos</p>}
        {data.title == "INFORMACIÓN DEL PERIODO" && data.amount && data.amount == "" && <p>No hay datos en el periodo</p>}
      </div>
    </div>
  )
}

export default Widget