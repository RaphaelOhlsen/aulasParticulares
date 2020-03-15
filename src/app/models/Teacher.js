const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {

  all(callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      GROUP BY teachers.id
      ORDER BY total_students DESC`,
      function(err, results) {
        if(err) throw `Database Error! ${err}`;
        callback(results.rows);
      }
    )
  },

  create(data, callback) {

    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        graduete,
        classtype,
        areas,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduete,
      data.classType,
      data.areas,
      date(Date.now()).iso
    ];

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`
    SELECT * FROM teachers
    WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  findBy(filter, callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.areas ILIKE '%${filter}'
      GROUP BY teachers.id
      ORDER BY total_students DESC`,
      function (err, results) {
        if(err) throw `Database Error! ${err}`;
        callback(results.rows);
      }
    );
  },

  update(data, callback) {
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        graduete=($4),
        classtype=($5),
        areas=($6),
        created_at=($7)
      WHERE id = $8
    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduete,
      data.classType,
      data.areas,
      date(Date.now()).iso,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`;
      callback();
    })
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM teachers WHERE id = $1`,
      [id], function(err, results) {
        if(err) throw `Database Error! ${err}`;
        callback();
    });
  }
}
