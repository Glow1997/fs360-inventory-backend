var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler");
const fb = require('../../services/firebase');

const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rbg(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rbg(75, 192, 192)',
    blue: 'rbg(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rbg(201, 203, 207)'
};

router.use(asyncHandler(async function(req, res, next){
    const headers = req.headers;
    try{
        if(!fb.verifyIdToken(headers.id_token, headers.uid)){
            return res.json({status:"Access is prohibited"})
        }
        next();
    }catch(err){
        console.error('[Users API Middleware] : ${err}')
        return res.json({status:"Access is prohibited"})
    }    
}));

router.get("/revenue", asyncHandler( async function(req, res, next){
    return res.json({
        barChartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
                {
                    label: 'Income',
                    backgroundColor: [
                        chartColors.purple,
                        chartColors.purple,
                        chartColors.purple,
                        chartColors.purple,
                        chartColors.purple],
                    data: [5, 3, 4, 6, 4]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Monthly Income'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 10
                        }
                    }
                ]          
            }
        }
    })
}));    

module.exports = router;