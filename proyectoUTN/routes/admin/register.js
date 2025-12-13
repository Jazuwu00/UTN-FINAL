var express = require('express')
var router = express.Router()
var usuariosModel = require('../../models/usuariosModel')
var md5 = require('md5')
router.get('/', (req, res) => {
  res.render('admin/register', {
    title: 'Crear cuenta',
  })
})

router.post('/', async (req, res) => {
  try {
    const { usuario, password } = req.body

    if (!usuario || !password) {
      return res.render('admin/register', {
        layout: 'admin/layout',
        error: 'Todos los campos son obligatorios',
      })
    }

    const existe = await usuariosModel.getUserByUsername(usuario)
    if (existe) {
      return res.render('admin/register', {
        layout: 'admin/layout',
        error: 'El usuario ya existe',
      })
    }

    const passwordHash = md5(password)

    await usuariosModel.createUser({
      usuario,
      password: passwordHash,
      rol: 'user',
    })

    res.render('admin/registerSuccess', {
      layout: 'admin/layout',
    })
  } catch (err) {
    console.error(err)
    res.render('admin/register', {
      error: 'Error al crear la cuenta',
    })
  }
})

module.exports = router
