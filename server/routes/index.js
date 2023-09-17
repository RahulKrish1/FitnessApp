const express = require('express');
const router = express.Router();

// routes
const authRoute = require('./auth.route');
const userRoute = require('./user.route')
const progressRoute = require('./progress.route');


const routesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/users',
        route: userRoute
    },
    {
        path:'/progress',
        route:progressRoute
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router