const bcrypt = require("bcrypt");
const User = require("../models/user");

// signup route handler

exports.signup = async(req,res)=>{
    try{
        // get data
        const {name,email,password,role} = req.body;
        // check if user allready exit
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User already exists'

            }) 
        }

        // secured password
        let hashedPassword;
        // documentation par jake padho
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err)
    {
        return res.status(500).json({
            success:false,
            message:`Error in hasing password`,
        })
    }

    // create entry 
    const user = await User.create({
        name,email,password:hashedPassword,role
    })
    return res.status(200).json({
        success:true,
        message:`User Created Successfully`,

    });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`User can not be registered ,please try again later`
        });


    }
    
}

// retru strategy