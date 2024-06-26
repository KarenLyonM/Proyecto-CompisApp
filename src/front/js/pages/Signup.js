import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/signUp.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from "./Alerts";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        user_name: "",
        last_name: ""
    });
    const [alertMessage, setAlertMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (!e.target.value.trim()) {
            setAlertMessage("Todos los campos son obligatorios");
        } else {
            setAlertMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.trim() || !formData.password.trim() || !formData.user_name.trim() || !formData.last_name.trim()) {
            setAlertMessage("Todos los campos son obligatorios");
            setOpen(true);
            return;
        }
        try {
            await actions.signUp(formData);
            setAlertMessage("Usuario creado correctamente, Inicie Sesion");
            setOpen(true)
            setFormData({
                email: "",
                password: "",
                user_name: "",
                last_name: ""
            });
        } catch (error) {
            if (error.message === "The email is already in use") {
                setAlertMessage("El correo electrónico ya está en uso");
                setOpen(true)
            } else {
                setAlertMessage("Error al crear el usuario");
                setOpen(true)
                console.error("Error al crear el usuario:", error);
            }
            setOpen(true);
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="container-fluid signUpStyles">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12 d-flex form">
                        <div className="container signUp">
                            <form>
                                <h1 className="title mb-1">Registrate</h1>
                                <div className="textSignUp">
                                    <div className="mb-1">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-1">
                                        <label className="form-label">Apellido</label>
                                        <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-1">
                                        <label className="form-label">Correo electrónico</label>
                                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-email" />

                                    </div>
                                    <div className="mb-1 input-container">
                                        <label className="form-label">Contraseña</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            className="eye"
                                            type="button"
                                            onClick={handleTogglePasswordVisibility}
                                        >
                                            {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                                        </button>
                                        <div id="passwordHelpBlock" className="form-text">
                                            * La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial.
                                        </div>
                                    </div>



                                    <div>
                                        <span>¿Ya estás registrado? <Link to="/user-login" className="link">  Iniciar Sesión</Link></span>
                                    </div>
                                </div>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={handleSubmit} type="submit" color="primary" variant="outlined" className="button">Continuar</Button>
                                    <CustomAlert open={open} onClose={handleClose} message={alertMessage} severity={alertMessage === "Usuario creado correctamente, Inicie Sesion" ? "success" : "error"} />
                                </Stack>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};
