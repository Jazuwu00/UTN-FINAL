var pool = require('./bd')

//  películas favoritas de un usuario
async function getFavoriteMovies(idUsuario) {
  try {
    const query = `
      SELECT 
        p.id_pelicula,
        p.titulo,
        p.director,
        p.actor_principal,
        p.genero,
        p.img_id,
        p.descripcion,
        p.anio_estreno,
        f.resena,
        f.puntuacion
      FROM favoritos_peliculas f
      JOIN peliculas p ON f.id_pelicula = p.id_pelicula
      WHERE f.id_usuario = ?
    `
    const rows = await pool.query(query, [idUsuario])
    return rows
  } catch (error) {
    console.log('Error en getFavoriteMovies:', error)
    throw error
  }
}
//  todas las películas  favoritas del usuario
async function getMovies(idUsuario) {
  try {
    let query = 'SELECT * FROM peliculas'
    const movies = await pool.query(query)

    if (!idUsuario) {
      return movies.map(m => ({ ...m, favorita: false }))
    }

    const favs = await pool.query(
      'SELECT id_pelicula FROM favoritos_peliculas WHERE id_usuario = ?',
      [idUsuario]
    )
    const favIds = favs.map(f => f.id_pelicula)

    return movies.map(m => ({ ...m, favorita: favIds.includes(m.id_pelicula) }))
  } catch (error) {
    console.log('Error en getMoviesWithFavorites:', error)
    throw error
  }
}
async function getMovieById(id) {
  const result = await pool.query('SELECT * FROM peliculas WHERE id_pelicula = ?', [id])
  console.log(result)
  return result[0]
}

async function insertMovie(
  titulo,
  director,
  actor_principal,
  genero,
  anio_estreno,
  descripcion,
  img_id
) {
  const sql = `
    INSERT INTO peliculas (titulo, director, actor_principal, genero, anio_estreno, descripcion, img_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  return pool.query(sql, [
    titulo,
    director,
    actor_principal,
    genero,
    anio_estreno,
    descripcion,
    img_id,
  ])
}

async function updateMovie(data) {
  let sql = `
    UPDATE peliculas SET
      titulo=?,
      director=?,
      actor_principal=?,
      genero=?,
      anio_estreno=?,
      descripcion=?
  `
  const params = [
    data.titulo,
    data.director,
    data.actor_principal,
    data.genero,
    data.anio_estreno,
    data.descripcion,
  ]

  if (data.img_id) {
    sql += ', img_id=?'
    params.push(data.img_id)
  }

  sql += ' WHERE id_pelicula=?'
  params.push(data.id_pelicula)

  return pool.query(sql, params)
}

module.exports = {
  getMovies,
  updateMovie,
  getMovieById,
  insertMovie,
  getFavoriteMovies,
}
