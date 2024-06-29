import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems:"center", height: "100vh"}} className='background'>
      <div className="landing">
        <header className="header">
          <img src={require("../../assets/logo_escuela.png")} />
          <h1>Bienvenidos</h1>
          <p style={{fontStyle: "italic"}}>"Empoderar a las generaciones futuras a través de la educación"</p>
        </header>
        <main className="main-content">
          <div className="buttons">
            <Link to="/login" className="button" style={{fontWeight: "lighter"}}>Iniciar Sesión</Link>
          </div>
          <br />
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Escuela Básica Manuel Piar. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
