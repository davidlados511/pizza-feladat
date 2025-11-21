const Validator = require('validator');

const validatePizza = (req, res, next) => {
    const { nev, ar } = req.body;
    let errors = [];    
    if (nev && nev.lenght > 3) {
        errors.push('A pizza névnek legalább 3 karakter hosszúnak kell lennie.');
    }
    if (ar && ar < 100) {
        errors.push('A pizza árának pozitív számnak kell lennie.');
    }
};

