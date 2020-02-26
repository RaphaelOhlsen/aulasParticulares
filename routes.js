const express = require('express');
const routes = express.Router();
const teachers = require('./controllers/teachers');
const students = require('./controllers/students');

routes.get("/", (req, res) => {
  return res.redirect("/teachers");
});

routes.get("/teachers", teachers.index );
routes.get("/teachers/create", (req,res) => {
  return res.render("teachers/create");
})
routes.get('/teachers/:id', teachers.show);
routes.get('/teachers/:id/edit', teachers.edit);
routes.delete('/teachers', teachers.delete);
routes.post('/teachers', teachers.post);
routes.put('/teachers', teachers.update);


routes.get("/students", students.index );
routes.get("/students/create", (req,res) => {
  return res.render("students/create");
})
routes.get('/students/:id', students.show);
routes.get('/students/:id/edit', students.edit);
routes.delete('/students', students.delete);
routes.post('/students', students.post);
routes.put('/students', students.update);

module.exports = routes;