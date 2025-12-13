import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la película');
        return res.json();
      })
      .then(data => setMovie(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p className="error-msg">{error}</p>;
  if (!movie) return <p>Cargando...</p>;

  return (
    <>
    <Header/>
     <div className="content">
      <div className="movie-detail-card">
        <h1 className="movie-title">{movie.titulo}</h1>
        {movie.imagen ? (
          <div className="movie-img">
            <img src={movie.imagen} alt={movie.titulo} />
          </div>
        ) : (
          <div className="movie-img placeholder-img">Sin imagen</div>
        )}
        <div className="movie-info">
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Actor principal:</strong> {movie.actor_principal}</p>
          <p><strong>Género:</strong> {movie.genero}</p>
          <p><strong>Año:</strong> {movie.anio_estreno}</p>
          <p>{movie.descripcion}</p>
        </div>
        <a href="http://localhost:3000/movies/" className="back-link">← Volver a la lista de películas</a>
      </div>
    </div></>
   
  );
}

export default MovieDetail;
