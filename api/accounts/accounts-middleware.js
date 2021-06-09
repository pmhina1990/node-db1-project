const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let {name, budget} = req.body;
  
  if (typeof name === "string") {
      name = name.trim();
  }

  switch(true) { 
    case ( name === undefined || budget === undefined ):
      res.status(400).json({message: "name and budget are required"});
      break;
    case (typeof name !== "string"):
      res.status(400).json({ message: `name of account must be a string.`});
      break;
    case (name.length < 3 || name.length > 100):
      res.status(400).json({ message: "name of account must be between 3 and 100"});
      break;
    case (typeof budget !== "number"):
      res.status(400).json({ message: "budget of account must be a number" });
      break;
    case (budget < 0 || budget > 1000000):
      res.status(400).json({ message: "budget of account is too large or too small" });
      break;
    default:
      req.body = {name, budget};
      next();
  } 
}

exports.checkAccountNameUnique = async (req, res, next) => {
  let {name} = req.body;

  if (typeof name === "string") {
      name = name.trim();
  }

  const accounts = await Accounts.getAll();
  accounts.map(account => {
    if (account.name === name) {
      res.status(400).json({message: "that name is taken"});
    }
  })
  next();
}

exports.checkAccountId = (req, res, next) => {
  const {id} = req.params;
  Accounts.getById(id)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({message: "account not found"});
      }
    })
    .catch(err => next(err))
}