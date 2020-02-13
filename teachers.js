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