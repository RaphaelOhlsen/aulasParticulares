const data = require('./data.json');

//show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id === Number(id);
  });

  console.log(foundTeacher);
}