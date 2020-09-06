const Persona = require('../../../models/driverPersona.js');

const nameFinder = (req, res) => {
  Persona.findOne({ name: req.query.name }, (err, doc) => {
    if (err) {
      res.status(500).send('');
    } else {
      const available = !doc;
      res.type('application/xml').render('handlers/string.ejs', { flag: available });
    }
  });
};

module.exports = nameFinder;