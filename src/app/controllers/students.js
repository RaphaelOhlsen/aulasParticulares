const { grade, date } = require('../../lib/utils');
const Student = require('../models/Student');

module.exports = {
  index(req,res) {
    let {filter, page = 1, limit = 3} = req.query;
    let offset = limit * (page - 1);
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        let total = 0;
        if(students[0] !== undefined)
          total = Math.ceil(students[0].total/limit);
        students.forEach(student => {
          student.grade = grade(student.grade);
        });
        const pagination = {
          total,
          page
        }
        return res.render("students/index",
          { students, filter, pagination})
      }
    };
    Student.paginate(params);
  },

  create(req, res) {
    Student.teacherSelectOptions(function(options) {
      return res.render("students/create", { teacherOptions: options});
    });
  },

  
  post(req,res) {
    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });
    
    Student.create(req.body, function(student) {
      return res.redirect(`/students/${student.id}`);
    })
  },
  
  show(req,res) {
    Student.find(req.params.id, function(student) {
      if(!student) return res.send("Student not found!");
      student.birth = date(student.birth).birthDay;
      student.grade = grade(student.grade);
      student.schoolHours = student.schoolhours;
      return res.render('students/show', { student });
    })
  },

  edit(req,res) {
    Student.find(req.params.id, function(student) {
      if(!student) return res.send("Student not found!");
      student.schoolHours = student.schoolhours;
      student.birth = date(student.birth).iso;
      return res.render('students/edit', { student });
    })
  },

  put(req,res) {

    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });

    Student.update(req.body, function() { 
      return res.redirect(`/students/${req.body.id}`);
    });
  },

  delete(req,res) {
    Student.delete(req.body.id, function() {
      return res.redirect(`/students`);
    });
  }
}