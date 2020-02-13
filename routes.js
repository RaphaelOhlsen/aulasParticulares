const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

routes.get("/", (req, res) => {
  return res.redirect("/teachers");
});

routes.get("/teachers", (req,res) => {
  return res.render("teachers/index");
});

routes.get('/teachers/:id', teachers.show)

routes.get('/students', (req, res) => {
  return res.send("students");
});


module.exports = routes;