
const { Category } = require('../models');

const ifNameComes = async(req = request, res = response, next) => {
            console.log("los parametros: ",req.params);
            console.log("los parametros: ",req.body);

            req.body.name = req.body.name?req.body.name:'';

            const [cat, name] = await Promise.all([
                Category.findById(req.params.id),
                Category.findOne({name:req.body.name.toUpperCase()})
            ]);
            
           

            console.log(cat);
            console.log(name);


            /*
            const exists = await Category.findOne({name:name.toUpperCase()});
            if(exists) throw new Error(`The Category: ${name} exists, use a diferent Category name`);
            */

            //next();
}

module.exports = {
    ifNameComes
}