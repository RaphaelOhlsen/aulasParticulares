const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
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
  }
}
