const user = require('../database/models/user');

async function login(req, res) {
  try {
    const { userId, hwid } = req.query;

    const userAgent = req.headers['user-agent'];
    if (userAgent != 'know')
      return res.status(401).json({ message: 'Unauthorized' });

    if (!hwid) return res.status(400).json({ message: 'Params undefined' });
    if (!userId)
      return res.status(400).json({ message: 'Discord ID undefined' });

    const findUser = await user.findById(userId);
    if (!findUser)
      return res.status(404).json({ message: 'Discord ID not found' });

    const now = new Date();
    findUser.deleteMany({ expiry: { $lt: now } });

    if (findUser?.hwid != null && findUser?.hwid != hwid)
      return res.status(401).json({ message: 'Unauthorized' });

    findUser.hwid = hwid;
    await findUser.save();

    return res.status(200).json({
      message: 'logged',
      username: findUser.username,
      expiry: findUser.expiry,
    });
  } catch {
    return res.status(500).json({ message: 'invalid error' });
  }
}

module.exports = login;
