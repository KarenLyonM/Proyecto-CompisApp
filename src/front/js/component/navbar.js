import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [favoriteProfiles, setFavoriteProfiles] = useState([]);

    useEffect(() => {
        const fetchFavoriteProfiles = async () => {
            try {
                const { token } = store;
                if (token) {
                    const data = await actions.getFavoriteProfiles();
                    setFavoriteProfiles(data);
                }
            } catch (error) {
                console.error('Error al obtener perfiles favoritos:', error);
            }
        };

        fetchFavoriteProfiles();
    }, [store, actions]);
    
	// useEffect(() => {
    //     const fetchFavoriteProfiles = async () => {
    //         try {
    //             const data = await actions.getFavoriteProfiles();
    //             setFavoriteProfiles(data);
    //         } catch (error) {
    //             console.error('Error al obtener perfiles favoritos:', error);
    //         }
    //     };

    //     fetchFavoriteProfiles();
    // }, [actions]);

	return (
        <div className="d-flex custom-navbar">
            <div>
                <Link to="/">
                    <img className="navbar-brand imageLogo" src={compislogo} alt="logo star wars" />
                </Link>
            </div>
            {store.token && (
            <div className="dropdown">
                <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                    Mis favoritos ({favoriteProfiles.length})
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
                    {favoriteProfiles.map(profile => (
                        <li key={profile.id}>
                            <p>
                                {profile.user_name} {profile.last_name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            )}
            <div className="textNavbar">
                <Link to="/profile">
                    <span> Mi perfil</span>
                </Link>
                <Link to="/finder">
                    <span>Buscar</span>
                </Link>
                <Link to="/user-login">
                    <span onClick={() => actions.logout()}>Cerrar sesión</span>
                </Link>
            </div>
        </div>
    );
};