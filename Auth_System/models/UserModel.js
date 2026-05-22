import pool from '../models/db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (id) =>{
    if(parseInt(id) === NaN){
    throw new Error('Invalid User ID')
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
    return user;
} 

export const createUser = async (email, password, userProfile) =>{
    if(email === ''){
        throw new Error ("Invalid email");
    }
    
    if(!validator.isEmail(email)){
        throw new Error('Invalid email format');
    }

    const [user] = await pool.query(
        "SELECT * FROM tbluser WHERE email = ?",
        [email]
    )

    if(user.length === 1){
        throw new Error('An account is already created with that email')
    }

    if(password === ''){
        throw new Error('Invalid password') 
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('Password too weak.');
    }

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    const response = await fetch(
        `http://localhost:4000/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userProfile)
        }
    );
    const result = await response.json();
    
    const [newUser] = await pool.query(
        "INSERT INTO tbluser(email, password) VALUES(?, ?)",
        [email, newPassword]
    )

    return newUser.insertId;
}

export const login = async (email, password) =>{
    if(email === '' || password === ''){
        throw new Error('Invalid email or password');
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);
    if(user.length === 0){
        throw new Error(`An account with the email ${email} does not exist`);
    }

    if (!bcrypt.compareSync(password, user[0].password)){
        throw new Error('Incorrect password');
    }

    //generate token
    const token = jwt.sign({id: user[0].id}, process.env.SECRET, {expiresIn: '1d'});

    return token;
}