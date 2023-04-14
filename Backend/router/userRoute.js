const express=require('express');
const userController=require('../controller/userController')
const router=express.Router();

router.post('/add-user',userController.addUser);
router.get('/get-user',userController.getUser);
router.put('/update-user',userController.updateUser);
router.delete('/delete-user',userController.deleteUser);

module.exports=router