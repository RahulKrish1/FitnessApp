const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');


const addProgressValidator = [
    check('exercise')
        .trim().not().isEmpty().withMessage('You need to add an exercise').bail()
        .isLength({min:3}).withMessage('Minimum 3 required').bail(),
    check('results')
        .trim().not().isEmpty().withMessage('You need to add your results').bail(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next()
    }
]


module.exports = {
    addProgressValidator
}