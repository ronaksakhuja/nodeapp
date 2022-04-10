var Userdb = require('../model/model');
const connectDBM = require('../database/conn');

const conn = connectDBM();

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // new user
    const user = new Userdb(req.body.name,req.body.email,req.body.gender, req.body.status)


    conn.query(`INSERT INTO \`users\` (name,email,gender,status) VALUES ('${user.name}','${user.email}','${user.gender}','${user.status}') `,function(err,res){
    console.log(res);
    console.log(err);

    });
    res.redirect('/');

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        conn.query(`SELECT * from \`users\` where id=${id}`,function(err,resp){
            console.log(resp)
            if(err){
                console.log("ERROR")
            }
            if(resp.length ==0){
                console.log("EMPTY")
                res.send("No user found")
            }
            else{
                res.send(resp[0])
            }
        })

    }else{
        conn.query(`SELECT * from \`users\``,function(err,resp){
            console.log(resp)
            if(err){
                console.log("ERROR")
            }
            else{
                res.send(resp)
            }
        })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    console.log("at update")
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;

    conn.query(`UPDATE \`users\` SET name='${req.body.name}',email='${req.body.email}',status='${req.body.status}', gender='${req.body.gender}' where id=${id}`,function(err,resp){
        console.log(resp)
        if(err){
            console.log("ERROR")
        }
        if(resp.length ==0){
            console.log("EMPTY")
            res.send("No user found")
        }
        else{
            res.send(resp[0])
        }
    })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    conn.query(`DELETE FROM \`users\` where id=${id}`,function(err,resp){
        console.log(resp)
        if(err){
            console.log("ERROR")
        }
        if(resp.length ==0){
            console.log("EMPTY")
            res.send("No user found")
        }
        else{
            res.send(
            {
                message : "User was deleted successfully!"
            }
            );
        }
    })
}