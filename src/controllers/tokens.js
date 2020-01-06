const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');
const moment = require('moment');

/**
 * Load MongoDB models.
 */
const Token = require('.././models/Token');

/**
 * Create Token Controler - Creates a API token for the user to use with sharex or other tools.
 */
exports.postToken = async (req, res, next) => {
  try {
    const { label, expire } = req.body;

    let expireAt;
    let expiresIn;
    let isNever;

    switch (expire) {
      case '1':
        expireAt = moment().add('24', 'h');
        expiresIn = '24h';
        break;
      case '7':
        expireAt = moment().add('7', 'd');
        expiresIn = '7d';
        break;
      case '30':
        expireAt = moment().add('1', 'M');
        expiresIn = '31d';
        break;
      default:
        expireAt = moment().add('100', 'y');
        expiresIn = '36500d';
        isNever = true;
    }

    const jwtToken = jwt.sign({}, process.env.API_SECRET, {
      issuer: process.env.TITLE,
      subject: req.user.id.toString(),
      expiresIn
    });

    const jwtHash = sha512(jwtToken);

    const token = new Token({
      user: req.user.id,
      hash: jwtHash,
      label,
      expireAt,
      isNever
    });

    await token.save();

    req.flash(
      'success',
      `Here's your API Key <p id="apiKey">${jwtToken}<p>This will not be showed again for security reasons.`
    );
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Rename label Token Controler - Allows users to rename label there tokens
 */
exports.putToken = async (req, res, next) => {
  try {
    const { label } = req.body;
    const token = await Token.findById(req.params.token_id);
    token.label = label;
    await token.save();
    req.flash('success', `Token has been to <strong>${label}</strong>.`);
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete Token Controler - Deletes a token via the token id.
 */

exports.deleteToken = async (req, res, next) => {
  try {
    await Token.findByIdAndDelete(req.params.token_id);
    req.flash('success', 'Token has been removed');
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
