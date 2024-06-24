const express = require("express");
const router = express.Router();


router.post('/homework', async (req,res) => {
    try{
        
    }
    catch{
        res.status(500).json({message : "API Error Occured while assigning the Homework!!!"});
    }
})