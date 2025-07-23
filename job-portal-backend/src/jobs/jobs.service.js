// const { Injectable } = require('@nestjs/common');
// const db = require('../db');

// @Injectable()
// class JobsService {
//   async findAll(query) {
//     let sql = 'SELECT * FROM jobs WHERE 1=1';
//     const params = [];

//     if (query.title) {
//       params.push(`%${query.title}%`);
//       sql += ` AND title ILIKE $${params.length}`;
//     }

//     if (query.location) {
//       params.push(query.location);
//       sql += ` AND location = $${params.length}`;
//     }

//     if (query.job_type) {
//       params.push(query.job_type);
//       sql += ` AND job_type = $${params.length}`;
//     }

//     const result = await db.query(sql, params);
//     return result.rows;
//   }

//   async findOne(id) {
//     const result = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
//     return result.rows[0];
//   }

//   async create(job) {
//     const {
//       title,
//       company_name,
//       location,
//       job_type,
//       salary_min,
//       salary_max,
//       description,
//       application_deadline,
//       requirements,
//       responsibilities,
//     } = job;

//     const result = await db.query(
//       `INSERT INTO jobs
//     (title, company_name, location, job_type, salary_min, salary_max, description, application_deadline, requirements, responsibilities)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//     RETURNING *`,
//       [
//         title,
//         company_name,
//         location,
//         job_type,
//         salary_min,
//         salary_max,
//         description,
//         application_deadline,
//         requirements,
//         responsibilities,
//       ],
//     );

//     return result.rows[0];
//   }

//   async update(id, job) {
//     const {
//       title,
//       company_name,
//       location,
//       job_type,
//       salary_min,
//       salary_max,
//       description,
//       application_deadline,
//       requirements,
//       responsibilities,
//     } = job;

//     const result = await db.query(
//       `UPDATE jobs SET
//       title = $1,
//       company_name = $2,
//       location = $3,
//       job_type = $4,
//       salary_min = $5,
//       salary_max = $6,
//       description = $7,
//       application_deadline = $8,
//       requirements = $9,
//       responsibilities = $10,
//       updated_at = CURRENT_TIMESTAMP
//      WHERE id = $11
//      RETURNING *`,
//       [
//         title,
//         company_name,
//         location,
//         job_type,
//         salary_min,
//         salary_max,
//         description,
//         application_deadline,
//         requirements,
//         responsibilities,
//         id,
//       ],
//     );

//     return result.rows[0];
//   }
//   async delete(id) {
//     const result = await db.query(
//       'DELETE FROM jobs WHERE id = $1 RETURNING *',
//       [id],
//     );
//     return result.rowCount > 0;
//   }
// }

// module.exports = { JobsService };
// const { Injectable } = require('@nestjs/common');
const db = require('../db'); // Your existing DB client wrapper

// @Injectable()
class JobsService {
  async findAll(query) {
    let sql = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (query.title) {
      params.push(`%${query.title}%`);
      sql += ` AND title ILIKE $${params.length}`;
    }
    if (query.location) {
      params.push(query.location);
      sql += ` AND location = $${params.length}`;
    }
    if (query.job_type) {
      params.push(query.job_type);
      sql += ` AND job_type = $${params.length}`;
    }

    const result = await db.query(sql, params);
    return result.rows;
  }

  async findOne(id) {
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(job) {
    const {
      title,
      company_name,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      application_deadline,
      requirements,
      responsibilities,
    } = job;

    const result = await db.query(
      `INSERT INTO jobs 
      (title, company_name, location, job_type, salary_min, salary_max, description, application_deadline, requirements, responsibilities)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        title,
        company_name,
        location,
        job_type,
        salary_min,
        salary_max,
        description,
        application_deadline,
        requirements,
        responsibilities,
      ],
    );

    return result.rows[0];
  }

  async update(id, job) {
    const {
      title,
      company_name,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      application_deadline,
      requirements,
      responsibilities,
    } = job;

    const result = await db.query(
      `UPDATE jobs SET
      title = $1,
      company_name = $2,
      location = $3,
      job_type = $4,
      salary_min = $5,
      salary_max = $6,
      description = $7,
      application_deadline = $8,
      requirements = $9,
      responsibilities = $10,
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $11
     RETURNING *`,
      [
        title,
        company_name,
        location,
        job_type,
        salary_min,
        salary_max,
        description,
        application_deadline,
        requirements,
        responsibilities,
        id,
      ],
    );

    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rowCount > 0;
  }
}

module.exports = { JobsService };
