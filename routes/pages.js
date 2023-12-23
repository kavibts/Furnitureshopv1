const express = require ("express");
const router = express.Router();
const userController = require("../controllers/users");
router.get("/", (req, res)=>{
    res.render("muebles");
});
router.get(["/login"],(req,res)=>{
    res.render("login");
});
router.get("/register",(req,res)=>{
    res.render("register");
});



router.get("/bed",(req,res)=>{
   
    res.render("bed");
});
router.get("/bedroom",(req,res)=>{
    
    res.render("bedroom");
});
router.get("/chairs",(req,res)=>{
 
    res.render("chairs");
});
router.get("/cupboards",(req,res)=>{
    
    res.render("cupboards");
});
router.get("/desks",(req,res)=>{
   
    res.render("desks");
});
router.get("/dressers",(req,res)=>{
   
    res.render("dressers");
});
router.get("/index",(req,res)=>{
   
    res.render("index");
});
router.get("/kitchen",(req,res)=>{
    
    res.render("kitchen");
});
router.get("/Lr",(req,res)=>{
  
    res.render("Lr");
});
router.get("/new arrival",(req,res)=>{
  
    res.render("new arrival");
});
router.get("/products",(req,res)=>{
   
    res.render("products");
});
router.get("/shop now",(req,res)=>{
   
    res.render("shop now");
});
router.get("/sofa",(req,res)=>{
    
    res.render("sofa");
});
router.get("/table",(req,res)=>{
    
    res.render("table");
});
router.get("/payment",(req,res)=>{
    
    res.render("payment");
});
router.get("/discount",(req,res)=>{
    
    res.render("discount");
});
router.get("/newarrival",(req,res)=>{
    
    res.render("newarrival");
});
router.get("/order",(req,res)=>{
    
    res.render("order");
});
module.exports = router;
