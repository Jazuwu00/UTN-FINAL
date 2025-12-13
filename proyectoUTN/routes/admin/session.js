const express = require('express')
const router = express.Router()

router.get('/current', (req, res) => {
  if (req.session.id_usuario) {
    res.json({
      nombre: req.session.nombre,
      rol: req.session.rol,
    })
  } else {
    res.json(null)
  }
})

module.exports = router
