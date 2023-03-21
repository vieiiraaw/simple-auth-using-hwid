const user = require('../database/models/user');

async function login(req, res) {
  try {
    console.log(req.query);

    const { userId, hwid } = req.query;
    const userAgent = req.headers['user-agent'];

    const findUser = await user.findById(userId);

    const now = new Date();
    findUser.deleteMany({ expiry: { $lt: now } }, function (err, result) {});

    if (userAgent != 'know')
      return res.status(401).json({ message: 'Unauthorized' });

    if (!hwid) return res.status(400).json({ message: 'Params undefined' });
    if (!userId)
      return res.status(400).json({ message: 'Discord ID undefined' });

    if (!findUser)
      return res.status(404).json({ message: 'Discord ID not found' });

    if (findUser.hwid != null && findUser.hwid != hwid)
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
