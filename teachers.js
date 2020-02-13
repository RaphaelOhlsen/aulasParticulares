const fs = require('fs');
const data = require('./data.json');

//show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id === Number(id);
  });

  if(!foundTeacher) return res.send("teacher not found");

  const teacher = {
    ...foundTeacher
  }

  return res.render("teachers/show", { teacher })
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