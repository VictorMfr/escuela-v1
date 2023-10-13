import React, { useState } from 'react';
import "./register.scss";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingModal from './LoadingModal';

const Register = () => {
  const { register, handleSubmit, formState: { errors: errs } } = useForm();
  const { register: reg, isAuthenticated, error, setErrors } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Define showPassword state and togglePasswordVisibility function
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const changePasswordHandler = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("La contraseña es muy corta, usa al menos 8 caracteres");
    } else {
      setPasswordError("");
    }
  }

  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const changeSecretKeyHandler = (event) => {
    setSecretKey(event.target.value);
  }

  const onSubmit = async (values) => {
    if (passwordError) {
      return Swal.fire({
        title: 'Hello!',
        text: `${passwordError}`,
        icon: 'error',
      });
    }

    if (password !== confirmPassword) {
      return Swal.fire({
        title: 'Hello!',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
    }

    setIsLoading(true);

    values.secretKey = secretKey;

    const res = await reg(values);
    if (res === true) {
      Swal.fire({
        title: 'Informacion',
        text: `Registrado Exitosamente`,
        icon: 'success',
      });
      return navigate("/login");
    }

    Swal.fire({
      title: 'Hello!',
      text: `${res.response.data.error ? res.response.data.error : res.message}`,
      icon: 'error',
    });

    setIsLoading(false);
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registrar Director</h1>
        <input type="text" placeholder='Usuario' {...register("username", { required: true })} value={username} onChange={changeUsernameHandler} />
        {errs.username && (
          <p className='text-error'>Username is required</p>
        )}
        <input type="email" placeholder='Email' {...register("email", { required: true })} value={email} onChange={changeEmailHandler} />
        {errs.email && (
          <p className='text-error'>Email is required</p>
        )}
        <div className="password-input" style={{ display: "flex", alignItems: "center" }}>
          <input type={showPassword ? "text" : "password"} placeholder='Contraseña' {...register("password", { required: true })} value={password} onChange={changePasswordHandler} />
          <button type="button" onClick={togglePasswordVisibility} style={{ margin: 0, marginLeft: 8, width: "max-content", fontWeight: "lighter" }}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {errs.password && (
          <p className='text-error'>Password is required</p>
        )}
        {passwordError && (
          <p className='text-error'>{passwordError}</p>
        )}
        <div className="password-input" style={{ display: "flex", alignItems: "center" }}>
          <input type={showPassword ? "text" : "password"} placeholder='Confirmar Contraseña' value={confirmPassword} onChange={changeConfirmPasswordHandler} />
          <button type="button" onClick={togglePasswordVisibility} style={{ margin: 0, marginLeft: 8, width: "max-content", fontWeight: "lighter" }}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <input type="text" placeholder='Llave secreta' value={secretKey} onChange={changeSecretKeyHandler} />
        <button type="submit" disabled={isLoading} style={{ fontWeight: "lighter" }}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      <LoadingModal show={isLoading} />
    </div>
  );
}

export default Register;
