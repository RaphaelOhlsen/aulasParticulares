const { age, strToArr, timeFormat, date } = require('../../lib/utils');
const Student = require('../models/Student');

module.exports = {
  index(req,res) {
    Student.all(function(students) {
      return res.render('students/index', { students });
    });
  },

  create(req, res) {
    return res.render('students/create');
  },

  
  post(req,res) {
    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });
    
    let {avatar_url, birth, name, graduete, classType, areas} = req.body;
    
    
    return 
  },
  
  show(req,res) {
    return
  },

  edit(req,res) {
    return
  },

  put(req,res) {

    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });

    return
  },

  delete(req,res) {
    return
  }

}