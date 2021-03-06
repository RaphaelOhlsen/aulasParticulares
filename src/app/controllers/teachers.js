const { age, strToArr, timeFormat, date } = require('../../lib/utils');

const Teacher = require('../models/Teacher');

module.exports = {
  index(req,res) {
    let { filter, page = 1, limit = 3 } = req.query;
    let offset = limit * (page -1);
    const params = {
      filter, 
      page,
      limit,
      offset,
      callback(teachers) {
        let total = 0
        if(teachers[0] !== undefined)
          total = Math.ceil(teachers[0].total/limit);
        const pagination = {
          total,
          page
        }
        return res.render("teachers/index",
          { teachers, filter, pagination })
      }
    };

    Teacher.paginate(params);
  },

  create(req, res) {
    return res.render('teachers/create');
  },

  
  post(req,res) {
    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });
        
    Teacher.create(req.body, function(teacher){
      return res.redirect('/teachers/${teacher.id');
    });
    
  },
  
  show(req,res) {
    Teacher.find(req.params.id, function(teacher) {
      if(!teacher) return res.send("Teacher not found!");

      teacher.age = age(teacher.birth);
      teacher.areas = teacher.areas.split(',');
      teacher.classType = teacher.classtype;
      teacher.created_at = date(teacher.created_at).format;

      return res.render('teachers/show', { teacher });
    });
  },

  edit(req,res) {
    Teacher.find(req.params.id, function(teacher) {
      if(!teacher) return res.send("Teacher not found!");
      teacher.classType = teacher.classtype;
      teacher.birth = date(teacher.birth).iso;
      return res.render('teachers/edit', { teacher });
    })
  },

  put(req,res) {

    const keys = Object.keys(req.body);
    
    keys.forEach(key => {
      if(req.body[key] == "") return res.send("Please, fill all fields");
    });

    Teacher.update(req.body, function() { 
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  delete(req,res) {
    Teacher.delete(req.body.id, function() {
      return res.redirect(`/teachers`);
    });
  }

}