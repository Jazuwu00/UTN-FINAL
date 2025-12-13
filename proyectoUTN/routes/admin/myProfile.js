var express = require('express')
var router = express.Router()
var MoviesModel = require('../../models/MoviesModel')
var ProfileModel = require('../../models/profileModel')
function requireLogin(req, res, next) {
  if (!req.session.id_usuario) {
    return res.redirect('/admin/login')
  }
  next()
}
router.get('/', requireLogin, async (req, res) => {
  try {
    const usuario = req.session.id_usuario
    const data = await MoviesModel.getFavoriteMovies(usuario)

    res.render('admin/myProfile', {
      layout: 'admin/layout',
      movies: data || [],
    })
  } catch (error) {
    console.log(error)
    res.redirect('/admin/login')
  }
})
router.post('/update', async (req, res) => {
  const { id_pelicula, resena, puntuacion } = req.body
  const userId = req.session.id_usuario

  console.log('BODY recibido:', req.body)

  if (!userId) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  try {
    await ProfileModel.updateReviewAndRating(userId, id_pelicula, resena, puntuacion)

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al actualizar' })
  }
})

module.exports = router
