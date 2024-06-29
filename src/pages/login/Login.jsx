import React, { useState } from 'react';
import "./login.scss";
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import LoadingModal from '../register/LoadingModal';
import Swal from "sweetalert2"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const { login, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};

    if (!formData.type) {
      validationErrors.type = "Seleccione una opción.";
    }

    if (!formData.email) {
      validationErrors.email = "Correo es requerido.";
    }

    if (!formData.password) {
      validationErrors.password = "Contraseña es requerido.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    const request = await login({
      email: formData.email,
      password: formData.password,
      type: formData.type.value,
    });

    if (request && request.message == "Request failed with status code 500") {
      Swal.fire({
        title: 'Atención',
        text: `${request.response.data.error}`,
        icon: 'error', 
      });

      setIsLoading(false);
    }


    setIsLoading(false);

    if (request === true) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const usersTypeList = [
    { key: 0, value: 'docente', label: 'Docente' },
    { key: 1, value: 'representante', label: 'Representante' },
    { key: 2, value: 'direccion', label: 'Director' },
    { key: 3, value: 'administracion', label: 'Administrador' },
  ];

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <h1>Iniciar Sesión</h1>
          {signinErrors?.map((error, i) => (
            <div className="div-error" key={i}>
              {error}
            </div>
          ))}
          <div className="form-group">
            <Select
              name="type"
              options={usersTypeList}
              value={formData.type}
              onChange={(value) => setFormData({ ...formData, type: value })}
              placeholder="Tipo de Usuario"
            />
            {errors.type && (
              <span className="text-error">{errors.type}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
            />
            {errors.email && (
              <span className="text-error">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            {errors.password && (
              <span className="text-error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <button type="submit" style={{ fontWeight: "lighter" }}>Ingresar</button>
          </div>
        </div>
      </form>
      <LoadingModal show={isLoading} />
    </div>
  );
};

export default Login;
