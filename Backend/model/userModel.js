const db=require('../dbConnection/connection');

function addUser(data){
let query=`INSERT into users(name,email,phone,address,country) VALUES('','','','','')`
const result=excuteDBQuery(query)
return result;

}

module.exports={
    addUser:addUser
}

function excuteDBQuery(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, success) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(success)
            }
        })
    })
}