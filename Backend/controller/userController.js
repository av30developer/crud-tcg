const { where } = require('sequelize');
const { Employee } =require('../models')
async function addUser(req,res) {
    console.log("req.body",req.body)
    const { firstName, lastName, email} = req.body;
    try{
        const employee = await Employee.create({firstName, lastName, email});
        return res.send({data:employee,status:200});
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function getUser(req,res) {
    try{
        const employee = await Employee.findAll();
        return res.json(employee);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function updateUser(req,res) {
    const id=req.query.id;
    const { firstName, lastName, email} = req.body;
    try{
        const employee = await Employee.findOne({where:{id}});
        employee.firstName=firstName;
        employee.lastName=lastName;
        employee.email=email;
        await employee.save();
        return res.json(employee);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res) {
    const id=req.query.id;
    try{
        const employee = await Employee.findOne({
            where: {id}
        });
        await employee.destroy();
        return res.json(employee);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports={
    addUser:addUser,
    getUser:getUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}