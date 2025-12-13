// JS usuariosModel.js
var pool = require('./bd') // llamando datos BD
var md5 = require('md5')

async function getUserByUsernameAndPassword(user, password) {
  try {
    var query = 'select * from usuarios where usuario = ? and password = ? limit 1'
    //desencriptar
    var rows = await pool.query(query, [user, md5(password)])

    return rows[0]
  } catch (error) {
    console.log(error)
  }
}
async function createUser(obj) {
  try {
    const query = `
      INSERT INTO usuarios (usuario, password, rol)
      VALUES (?, ?, ?)
    `
    const params = [obj.usuario, obj.password, obj.rol]
    return await pool.query(query, params)
  } catch (error) {
    throw error
  }
}

async function getUserByUsername(usuario) {
  const query = 'SELECT * FROM usuarios WHERE usuario = ?'
  const rows = await pool.query(query, [usuario])
  return rows[0]
}

module.exports = { getUserByUsernameAndPassword, getUserByUsername, createUser }
