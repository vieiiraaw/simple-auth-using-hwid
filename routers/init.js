const application = require('../database/models/application');

// test
async function init(req, res) {
  try {
    const { version, applicationId } = req.query;
    const userAgent = req.headers['user-agent'];

    if (userAgent != 'know')
      return res.status(401).json({ message: 'auth: Unauthorized' });
    if (!version || !applicationId)
      return res.status(400).json({ message: 'auth: Params undefined' });

    const findApplication = await application.findById(applicationId);
    if (!findApplication)
      return res.status(404).json({ message: 'auth: Application not found' });

    return res
      .status(200)
      .json({ message: 'Initialized', key: findApplication.key });
  } catch {
    return res.status(500).json({ message: 'invalid error' });
  }
}

module.exports = init;
