const paramValidate = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        sucess: false,
        error: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = paramValidate;
