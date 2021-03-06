module.exports = async (req, res, next) => {
  try {
    const signupTerms = process.env.SIGNUP_TERMS === 'true';
    if (!signupTerms) {
      return res.status(404).send('Not found.');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
