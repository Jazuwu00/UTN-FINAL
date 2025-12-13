var express = require('express')
var router = express.Router()
var MoviesModel = require('../models/MoviesModel')
var pool = require('../models/bd')
var util = require('util')
var coudinary = require('cloudinary').v2
const uploader = util.promisify(coudinary.uploader.upload)

function requireAdmin(req, res, next) {
  if (req.session.rol === 'admin') {
    return next()
  }
  return res.status(403).render('admin/noAutorizado', {
    layout: 'admin/layout',
  })
}

const securedJSON = (req, res, next) => {
  if (req.session.id_usuario) {
    next()
  } else {
    res.status(401).json({ error: 'No autorizado' })
  }
}

module.exports = securedJSON

//  Todas las películas
router.get('/', async (req, res) => {
  try {
    const idUsuario = req.session.id_usuario || null
    let movies = await MoviesModel.getMovies(idUsuario)
    movies = movies.map(movie => {
      if (movie.img_id) {
        const imagen = coudinary.url(movie.img_id, { width: 150, height: 220, crop: 'fill' })
        return { ...movie, imagen }
      } else {
        return {
          ...movie,
          imagen: '',
        }
      }
    })
    res.render('movies', { movies })
  } catch (error) {
    console.log(error)
    res.render('error', { error })
  }
})

router.post('/toggle', securedJSON, async (req, res) => {
  const idUsuario = req.session.id_usuario
  const { id_pelicula } = req.body

  try {
    const exists = await pool.query(
      'SELECT * FROM favoritos_peliculas WHERE id_usuario = ? AND id_pelicula = ?',
      [idUsuario, id_pelicula]
    )

    if (exists.length > 0) {
      // si ya existe eliminar
      await pool.query('DELETE FROM favoritos_peliculas WHERE id_usuario = ? AND id_pelicula = ?', [
        idUsuario,
        id_pelicula,
      ])
      res.json({ favorita: false })
    } else {
      // si no existe  agregar
      await pool.query('INSERT INTO favoritos_peliculas (id_usuario, id_pelicula) VALUES (?, ?)', [
        idUsuario,
        id_pelicula,
      ])
      res.json({ favorita: true })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar favorito' })
  }
})

// screen agregar película
router.get('/add', requireAdmin, (req, res) => {
  res.render('admin/addMovie', {
    layout: 'admin/layout',
  })
})
// subir película

router.post('/add', requireAdmin, async (req, res) => {
  try {
    var img_id = ''
    if (req.files && Object.keys(req.files).length > 0) {
      const imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id
    }
    const { titulo, director, actor_principal, genero, anio_estreno, descripcion } = req.body

    await MoviesModel.insertMovie(
      titulo,
      director,
      actor_principal,
      genero,
      anio_estreno,
      descripcion,
      img_id
    )
    res.redirect('/movies')
  } catch (error) {
    console.log(error)
    res.render('admin/addMovie', {
      layout: 'admin/layout',
      error: true,
      movie: req.body,
    })
  }
})
router.post('/delete', requireAdmin, async (req, res) => {
  const { id_pelicula } = req.body

  try {
    await pool.query('DELETE FROM favoritos_peliculas WHERE id_pelicula = ?', [id_pelicula])

    await pool.query('DELETE FROM peliculas WHERE id_pelicula = ?', [id_pelicula])

    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al eliminar la película' })
  }
})
router.get('/edit/:id', requireAdmin, async (req, res) => {
  try {
    const movie = await MoviesModel.getMovieById(req.params.id)
    console.log(movie)
    if (movie) {
      res.render('admin/addMovie', {
        layout: 'admin/layout',
        movie,
      })
    }
  } catch (error) {
    console.log(error)
    res.redirect('/movies')
  }
})

router.post('/edit', requireAdmin, async (req, res) => {
  try {
    let img_id = null

    if (req.files && Object.keys(req.files).length > 0) {
      const imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id
    }

    const { id_pelicula, titulo, director, actor_principal, genero, anio_estreno, descripcion } =
      req.body

    await MoviesModel.updateMovie({
      id_pelicula,
      titulo,
      director,
      actor_principal,
      genero,
      anio_estreno,
      descripcion,
      img_id,
    })
    res.redirect('/movies')
  } catch (error) {
    console.log(error)
    res.render('admin/addMovie', {
      layout: 'admin/layout',
      error: true,
      movie: req.body,
    })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const movie = await MoviesModel.getMovieById(req.params.id)

    if (!movie) return res.status(404).json({ error: 'Película no encontrada' })

    let imagenUrl = null
    if (movie.img_id) {
      imagenUrl = coudinary.url(movie.img_id, {
        width: 400,
        height: 600,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      })
    }

    res.json({
      ...movie,
      imagen: imagenUrl,
    })
  } catch (err) {
    console.error(err) // importante para depurar
    res.status(500).json({ error: 'Error del servidor' })
  }
})

module.exports = router
