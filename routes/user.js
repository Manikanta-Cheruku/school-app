const express = require("express")

const router = express.Router()

const User = require('../Models/User');

router.post('/signup',  async (req,res) => {
   

    try{
       const user =  await User.findOne({username: req.body.username});

        if(!user){
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).json({message: "User Signedup Successfully!!"});
    }
    else{
        res.status(404).json({message: "User already exists"});
    }
    
    
}
catch(err){
    res.status(500).json({message: "API Error Occured while creating user!!", err_desc: err.message});
    
}   
});

router.post('/login', async (req,res) => {
    try{
        
        const user = await User.findOne({username: req.body.username });
        
        if(!user){
            res.status(404).json({message : "User not found, please signup before you login !!"});
        }
        else {
            if(user.password === req.body.password) {
                const {password, ...rest} = user._doc;
                res.status(200).json({message: "User Login Successfully!!", userDetails: {...rest}});
            }
            else{
                res.status(401).json({message: "Incorrect password!!"})
            }
        }

    }
    catch(err){
        res.status(500).json({message: "API Error occurred while login !!", err_desc: err.message});
    }
})

router.get('/profile/:username', async(req,res) => {

    try{
    
    const userdetails = await User.findOne({username : req.params.username}).populate("homeworks");
    
    if(!userdetails){
        res.status(404).json({message: "User not found !!"})
    }
    else{
        const {password,...rest} = userdetails._doc
        res.status(200).json({message: "UserProfile fetched Successfully!!",userProfile: {...rest} });
    }

    }catch(err){
        res.status(500).json({message : "API Error Occured while fetching User details !!", err_desc : err.message});
    }

})


module.exports = router;