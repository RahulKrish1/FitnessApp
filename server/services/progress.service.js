const { Progress } = require('../models/progress');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError')


const addProgress =  async(body) => {
    try{
        const progress = new Progress({
            ...body
        })
        await progress.save();
        return progress;
    } catch(error){
        throw error
    }
}

const getProgressById = async(_id,user) => {
    try{
        const progress = await Progress.findById(_id);
        if(!progress) throw new ApiError(httpStatus.NOT_FOUND,'Progress not found');
        if(user.role === 'user' && progress.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND,'Sorry you are not allowed');
        }
        return progress;
    } catch(error){
        throw error
    }
}


const getUsersProgressById = async(_id) => {
    try{
        const progress = await Progress.findById(_id);
        if(!progress) throw new ApiError(httpStatus.NOT_FOUND,'Progress not found');

        if(progress.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND,'Sorry you are not allowed');
        }
        return progress;
    } catch(error){
        throw error
    }
}

const updateProgressById = async(_id,body) => {
    try{
        const progress = await Progress.findOneAndUpdate(
            {_id},
            { "$set": body },
            { new: true }
        );
        if(!progress) throw new ApiError(httpStatus.NOT_FOUND,'Progress not found');
        return progress;
    } catch(error){
        throw error
    }
}


const deleteProgressById = async(_id) => {
    try{
        const progress =await Progress.findByIdAndRemove(_id);
        if(!progress) throw new ApiError(httpStatus.NOT_FOUND,'Progress not found');
        return progress;
    } catch(error){
        throw error
    }
}

const allProgress = async(req) => {
    const sortby = req.query.sortby || "_id";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 2;

    try{
        const progress = await Progress
        .find({status:'public'})
        .sort([
            [sortby,order]
        ])
        .limit(parseInt(limit));
        return progress;
    } catch(error){
        throw error
    }
}


const moreProgress = async(req) => {
    const sortby = req.body.sortby || "_id";
    const order = req.body.order || "desc";
    const limit = req.body.limit || 3;
    const skip = req.body.skip || 0;

    try{
        const progress = await Progress
        .find({status:'public'})
        .sort([[sortby,order]])
        .skip(skip)
        .limit(parseInt(limit));
        return progress;
    } catch(error){
        throw error
    }
}

const paginateAdminProgress = async(req) => {
    try{
        let aggQuery = Progress.aggregate();
        if(req.body.keywords && req.body.keywords != ''){
            const re = new RegExp(`${req.body.keywords}`,'gi')
            aggQuery = Progress.aggregate([
                { $match: { exercise:{ $regex:re}}}
            ]);
        } else {
            aggQuery = Progress.aggregate();
        }


        const limit = req.body.limit ?  req.body.limit : 5;
        const options = {
            page: req.body.page,
            limit,
            sort:{ _id:'desc'}
        }
        const progress = await Progress.aggregatePaginate(aggQuery,options);
        return progress;
    } catch(error){
        throw error
    }
}

module.exports = {
    addProgress,
    getProgressById,
    getUsersProgressById,
    updateProgressById,
    deleteProgressById,
    allProgress,
    moreProgress,
    paginateAdminProgress
}