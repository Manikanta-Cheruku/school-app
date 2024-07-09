const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Homework = require("../Models/Homework");


router.post('/', async (req,res) => {
    try{
        const teacher = await User.find({_id: req.body.userId, role: "teacher"});

        if (!teacher) {
            res.status(404).json({message: "Teacher not found!"});
        }
        
        const createHomework = new Homework({
            title: req.body.title,
            description: req.body.description,
            date: new Date(),
            userId: req.body.userId,
            subject: req.body.subject
        });
        await createHomework.save();
        
        res.status(200).json({message : "Homework created successfully!!", createHomework});
    }
    catch{
        res.status(500).json({message : "API Error Occured while assigning the Homework!!!"});
    }
})


router.post("/assign", async (req, res) => {
    // request body -> username, homeworkId
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(404).json({message: "User not found!"});
        }
        else {
            if (user.role === "teacher") {
                await User.updateMany(
                    {
                        role: "student"
                    }, 
                    {
                        $addToSet: {
                            homeworks: req.body.homeworkId
                        }
                    }, 
                    {
                        new: true
                    }
                )

                res.status(200).json({message: "Homework assigned successfully for the students!"})
            }
            else {
                res.status(404).json({message: "You are not eligible for assigning Homework to students!"});
            }
        }
    }
    catch(err) {
        res.status(500).json({message: "API Error occured while assigning Homework!", error: err.message});
    }
})


module.exports = router;