var pool = require('./bd')

async function updateReviewAndRating(userId, movieId, review, rating) {
  const query = `
    UPDATE favoritos_peliculas
    SET resena = ?, puntuacion = ?
    WHERE id_usuario = ? AND id_pelicula = ?
  `

  try {
    const result = await pool.query(query, [review, rating, userId, movieId])

    return result
  } catch (error) {
    console.error('Error al actualizar reseña y puntuación:', error)
    throw error
  }
}

module.exports = { updateReviewAndRating }
