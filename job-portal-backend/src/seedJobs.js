import db from './db.js';

async function createJobsTable() {
  await db.query(`DROP TABLE IF EXISTS jobs CASCADE;`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      company_name TEXT NOT NULL,
      location TEXT NOT NULL,
      job_type TEXT,
      salary_min INTEGER,
      salary_max INTEGER,
      description TEXT,
      application_deadline DATE,
      requirements TEXT,
      responsibilities TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function seedJobs() {
  await createJobsTable();

  const jobs = [
    {
      title: 'Frontend Developer',
      company_name: 'TechCorp',
      location: 'Bangalore',
      job_type: 'Full-time',
      salary_min: 500000,
      salary_max: 800000,
      description: 'Develop UI in React.',
      application_deadline: '2025-08-31',
      requirements: 'React, HTML, CSS',
      responsibilities: 'Build web apps and collaborate with UX team.',
    },
    {
      title: 'Backend Engineer',
      company_name: 'DevSolutions',
      location: 'Chennai',
      job_type: 'Full-time',
      salary_min: 600000,
      salary_max: 1000000,
      description: 'Build APIs in Node.js',
      application_deadline: '2025-09-10',
      requirements: 'Node.js, PostgreSQL',
      responsibilities: 'Design REST APIs and integrate databases.',
    },
    {
      title: 'Data Analyst',
      company_name: 'DataMagic',
      location: 'Remote',
      job_type: 'Contract',
      salary_min: 400000,
      salary_max: 600000,
      description: 'Analyze business data.',
      application_deadline: '2025-08-20',
      requirements: 'Python, SQL, Excel',
      responsibilities: 'Create reports and dashboards.',
    },
  ];

  for (const job of jobs) {
    await db.query(
      `INSERT INTO jobs 
        (title, company_name, location, job_type, salary_min, salary_max, description, application_deadline, requirements, responsibilities)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT DO NOTHING`,
      [
        job.title,
        job.company_name,
        job.location,
        job.job_type,
        job.salary_min,
        job.salary_max,
        job.description,
        job.application_deadline,
        job.requirements,
        job.responsibilities,
      ],
    );
  }

  console.log('✅ Job seeding complete!');
  process.exit();
}

seedJobs().catch((err) => {
  console.error('❌ Job seeding failed:', err);
  process.exit(1);
});
