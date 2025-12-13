import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <header className="main-header">
      <div className="container">
        <h1 className="logo">Love Movies</h1>
        <nav className="nav">
          <a href="http://localhost:3000/" className="nav-link">Inicio</a>
          <a href="http://localhost:3000/movies" className="nav-link">Películas</a>

          {user?.rol === 'admin' && (
            <a href="http://localhost:3000/movies/add" className="nav-link">Agregar Película</a>
          )}

          {user?.nombre ? (
            <>
              {user.rol !== 'admin' && (
                <a href="http://localhost:3000/admin/myProfile" className="nav-link">Mi perfil</a>
              )}
              <a href="http://localhost:3000/admin/login/logout" className="nav-link logout">Cerrar sesión</a>


            </>
          ) : (
            <a href="http://localhost:3000/admin/login" className="nav-link">Iniciar sesión</a>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
