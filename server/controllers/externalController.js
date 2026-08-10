const axios = require('axios');

exports.searchJobs = async (req, res) => {
  try {
    const { role, location, country } = req.query;
    const countryCode = country || 'in';

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/1`,
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          what: role || '',
          where: location || '',
          results_per_page: 20,
        },
      }
    );

    const jobs = response.data.results
      .map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company?.display_name || 'Unknown',
        location: job.location?.display_name || 'N/A',
        description: job.description,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        url: job.redirect_url,
      }))
      .filter((job, index, self) =>
        index === self.findIndex((j) => j.title === job.title && j.company === job.company)
      )
      .slice(0, 10);

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};