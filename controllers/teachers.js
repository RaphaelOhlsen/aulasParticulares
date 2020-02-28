const fs = require('fs');
const data = require('../data.json');
const { age, strToArr, timeFormat, date } = require('../utils');

//index
exports.index = (req,res) => {
  const teachers = data.teachers;

  teachers.forEach(teacher => {
    teacher._areas = strToArr(teacher.areas);
  });

  return res.render('teachers/index', { teachers })
}


//show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id === Number(id);
  });

  if(!foundTeacher) return res.send("teacher not found");

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    areas: strToArr(foundTeacher.areas),
    created_at: timeFormat(foundTeacher.created_at)
  }

  return res.render("teachers/show", { teacher });
}

//post
exports.post = (req, res) => {
  const keys = Object.keys(req.body);
 
  keys.forEach(key => {
    if(req.body[key] == "") return res.send("Please, fill all fields");
  });

  let {avatar_url, birth, name, graduete, classType, areas} = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth, 
    graduete,
    classType,
    areas,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/teachers");
  });
}

//edit
exports.edit = (req, res) => {
  
  const { id } = req.params;
  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id === Number(id);
  });

  if(!foundTeacher) return res.send("teacher not found");

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
  }

  return res.render("teachers/edit", { teacher });
}

//put
exports.update = (req,res) => {
  const { id, birth } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if (teacher.id == Number(id)) {
      index = foundIndex;
      return true
    }
  });

  if(!foundTeacher) return res.send("instructor not found");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(birth),
    id: Number(id)
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect(`/teachers/${id}`);
  });
}

//delete
exports.delete = (req,res) => {
  const {id} = req.body;

  const filterTeachers = data.teachers.filter(instructor => {
    return instructor.id != id;
  });

  data.teachers = filterTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect("/teachers");
  });
}