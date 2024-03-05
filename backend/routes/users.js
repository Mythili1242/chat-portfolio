const express=require("express");
const router=express.Router();
const cont=require("../controllers/users")

router.post("/signup",cont.signup)
router.get("/new",cont.data)
router.post("/checkuname",cont.checkuname)
router.post("/loginSubmit",cont.loginSubmit)
module.exports=router;
