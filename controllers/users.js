const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const id = req.params.id
  console.log(id);
  let sql = `SELECT ?? FROM ?? WHERE ?? = ?`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['*','users', 'id', id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let newUser = req.body
  let first = newUser.first_name
  let last = newUser.last_name
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (first_name, last_name) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', `${first}`, `${last}`])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = ""
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = ""
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}