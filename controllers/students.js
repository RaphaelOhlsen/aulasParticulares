const fs = require('fs');
const data = require('../data.json');
const { grade, date } = require('../utils');

//index
exports.index = (req,res) => {
  const students = data.students;

  return res.render('students/index', { students })
}


//show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundstudent = data.students.find(student => {
    return student.id === Number(id);
  });

  if(!foundstudent) return res.send("student not found");

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).birthDay,
    grade: grade(foundstudent.grade)
  }

  return res.render("students/show", { student });
}

//post
exports.post = (req, res) => {
  const keys = Object.keys(req.body);
 
  keys.forEach(key => {
    if(req.body[key] == "") return res.send("Please, fill all fields");
  });

  let {avatar_url, birth, name, email, grade, schoolHours} = req.body;

  birth = Date.parse(birth);

  let id = 1;
  const lastStudent = data.students[data.students.length - 1];
  if(lastStudent) {
    id = lastStudent.id + 1;
  }

  data.students.push({
    id,
    avatar_url,
    name,
    birth, 
    email,
    grade,
    schoolHours
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/students");
  });
}

//edit
exports.edit = (req, res) => {
  
  const { id } = req.params;
  const foundstudent = data.students.find(student => {
    return student.id === Number(id);
  });

  if(!foundstudent) return res.send("student not found");

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).birthDay
  }

  return res.render("students/edit", { student });
}

//put
exports.update = (req,res) => {
  const { id, birth } = req.body;
  let index = 0;

  const foundstudent = data.students.find((student, foundIndex) => {
    if (student.id == Number(id)) {
      index = foundIndex;
      return true
    }
  });

  if(!foundstudent) return res.send("instructor not found");

  const student = {
    ...foundstudent,
    ...req.body,
    birth: Date.parse(birth),
    id: Number(id)
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect(`/students/${id}`);
  });
}

//delete
exports.delete = (req,res) => {
  const {id} = req.body;

  const filterstudents = data.students.filter(instructor => {
    return instructor.id != id;
  });

  data.students = filterstudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect("/students");
  });
}