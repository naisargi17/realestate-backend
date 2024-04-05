import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User ({username,email,password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User created successfully !');    
    }catch(err){
        next(err);
    }
};

export const login = async(req,res,next) =>{
    const{email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id },'secret123');
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);

    }catch(err){
        next(err);
    }
}