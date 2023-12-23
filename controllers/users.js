const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});
exports.login=async(req, res) =>{
    try{
        // const { email, password} = req.body;
        const email=req.body.email;
        const password=req.body.pswd;
        // if(!email || !password){
        //     return res.status(400).render('login',{msg: "Please Enter email and Password",msg_type:"error"});
            
        // }
        db.query('select * from furniture.users where email=?' ,[email],(error,result)=>{
            console.log(result);
            if(result.length > 1 ){
                 res.render('login',{msg: "Email and Password incorrect..",msg_type:"error"});   
            }
            else{
                if(password!=result[0].PASS){
                    res.render('login',{msg: "Password incorrect..",msg_type:"error"});
                    // console.log(password);
                }
                else{
                res.render("index");

                }
            }
            // else{
            //     if(!(await bcrypt.compare(password,result[0].PASS))){
            //         return res.status(401).render('login',{msg: "Email and Password incorrect..",msg_type:"error"}); 
            //     }
            //     else{
            //         res.render("home");
            //         // const id=result[0].ID;
            //         // const token=jwt.sign({id:id},process.env.JWT_SECRET,{
            //         //     expiresIn:process.env.JWT_EXPIRES_IN,
            //         // });
            //         // console.log("the token is" + token);
            //         // const cookieOptions = {
            //         //     expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
            //         //     httpOnly:true,
            //         // } ;
            //         // res.cookie("joes",token,cookieOptions);
                    
            //     }
            // }
        });
            
    }
    catch(error){
        console.log(error);
    }
};
exports.register=(req, res) => {
    console.log(req.body);
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirm_password = req.body.confirm_password;
    //console.log(email);
    //console.log(password);
    const { email,  password, confirm_password } = req.body;
    // console.log(email);
    // console.log(password);
    db.query("select email from furniture.users where email=?",[email],async (error, result) => {
            if (error) {
                console.log(error);
            }
            if (result.length > 0) {
                return res.render("register", { msg: "Email id already taken",msg_type:"error" });
            }
            else if (password !== confirm_password) {
                return res.render("register", { msg: "Password does not match" ,msg_type:"error"});
            }
            let hashedPassword = await bcrypt.hash(password, 8);
                     db.query("insert into users set ?", { email: email, pass: password }, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                    return res.render("register", { msg: "User Registration success",msg_type:"good" });
                    
                }
            });
         });
    console.log("form submitted");
};
exports.isLoggedIn = async(req,res,next) => {
    //req.name = "check Login...";
    //next();
    console.log(req.cookies);
    if(req.cookies.joes){
        try{
        const decode=await promisify(jwt.verify)(
            req.cookies.joes,
            process.env.JWT_SECRET
        );
        console.log(decode);
        db.query("select * from furniture.users where id=?",[decode.id],(err,results)=>{
            if(!results){
              return next();
        }
        req.user = results[0];
        return next();
    }
        );
}
        catch(error){
            console.log(error);
            return next();
    
    }
}
    
    else{
        next();
    }
};