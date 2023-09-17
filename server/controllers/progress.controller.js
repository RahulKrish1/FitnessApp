const httpStatus = require('http-status');
const { progressService } = require('../services')



const progressController = {
    async createProgress(req,res,next){
        try{
            const progress = await progressService.addProgress(req.body);
            res.json(progress);
        } catch(error){
            next(error)
        }
    }, 
    async getProgressById(req,res,next){
        try{
            const _id = req.params.id;
            const progress = await progressService.getProgressById(_id,req.user);
            res.json(progress);
        } catch(error){
            next(error)
        }
    },
    async getUsersProgressById(req,res,next){
        try{
            const _id = req.params.id;
            const progress = await progressService.getUsersProgressById(_id);
            res.json(progress);
        } catch(error){
            next(error)
        }
    },
    async updateProgressById(req,res,next){
        try{
            const _id = req.params.id;
            const progress = await progressService.updateProgressById(_id,req.body)
            res.json(progress);
        } catch(error){
            next(error)
        }
    },
    async deleteProgressById(req,res,next){
        try{
            const _id = req.params.id;
            await progressService.deleteProgressById(_id)
            res.status(httpStatus.OK).json({action:'deleted'});
        } catch(error){
            next(error)
        }
    },
    async getAllProgress(req,res,next){
        try{
           const progress = await progressService.allProgress(req)
            res.json(progress)
        } catch(error){
            next(error)
        }
    },
    async getMoreProgress(req,res,next){
        try{
           const progress = await progressService.moreProgress(req)
            res.json(progress)
        } catch(error){
            next(error)
        }
    },
    async adminPaginate(req,res,next){
        try{
            const progress = await progressService.paginateAdminProgress(req);
            res.json(progress);
        } catch(error){
            next(error)
        }
    },
}

module.exports = progressController;