const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {

  all(callback) {
    db.query(`
      SELECT * FROM students
      ORDER BY name ASC`,
      function(err, results) {
        if(err) throw `Database Error! ${err}`;
        callback(results.rows);
      }
    )
  },

  create(data, callback) {

    const query = `
      INSERT INTO students (
        avatar_url, 
        name,
        birth,
        email,
        grade,
        schoolhours
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.grade,
      data.schoolHours
    ];

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    })
  },

  find(id, callback) {
    db.query(`
    SELECT students.*, teachers.name AS teacher_name
    FROM students
    LEFT JOIN teachers ON (students.teacher_id = teachers.id)
    WHERE students.id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        grade=($4),
        schoolhours=($5)
      WHERE id = $6
    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.grade,
      data.schoolHours,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      callback();
    })
  },

  delete(id, callback) {
    db.query(
      `DELETE FROM students WHERE id = $1`,
      [id], function(err, results) {
        if(err) throw `Database Error! ${err}`;
        callback();
    });
  },
  teacherSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      return callback(results.rows);
    })
  }
}