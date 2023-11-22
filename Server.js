const express = require("express");
require('./connect');
const userdb = require("./schema/user")
const DbAdd = require("./schema/bannerschema")
const movie_row = require("./schema/rowschema")
const toprateddb = require("./schema/topratedschema")
const actionrowdb = require("./schema/actionschema")
const disneydb = require("./schema/disneyschema");
const pixardb = require("./schema/pixarschema");
const marveldb = require("./schema/marvelschema");
const starwardb = require("./schema/starwarschema");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const cors = require("cors");
app.use(cors());

app.get("/", (req, res)=>{
    res.send("FlimFair Website Server")
});
app.get("/trail", (req,res)=>{
    res.render("trail")
})

app.get("/movieinfo", async(req,res)=>{
    try{
        const detail = await DbAdd.find({});
        res.send(detail); 
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/movierow", async(req,res)=>{
    try{
        const row_detail = await movie_row.find({});
        res.send(row_detail);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/toprated", async(req,res)=>{
    try{
        const toprated_detail = await toprateddb.find({});
        res.send(toprated_detail);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/actionrow", async(req,res)=>{
    try{
        const action_row = await actionrowdb.find({});
        res.send(action_row);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/disney", async(req,res)=>{
    try{
        const disney = await disneydb.find({});
        res.send(disney);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/pixar", async(req,res)=>{
    try{
        const pixar = await pixardb.find({});
        res.send(pixar);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/marvel", async(req,res)=>{
    try{
        const marvel = await marveldb.find({});
        res.send(marvel);
    }catch(e){
        res.status(404).send(e);
    }
})
app.get("/starwar", async(req,res)=>{
    try{
        const starwar = await starwardb.find({});
        res.send(starwar);
    }catch(e){
        res.status(404).send(e);
    }
})


app.post("/user_detail", async(req, res)=>{
    const inpres = req.body;
    console.log(inpres);

    try{
        const dt = await userdb.findOne({UserEMAIL: req.body.user_email})
        if(dt){
            res.json("Email Already Registered")
        }
        else{
            const user = new userdb({
                UserNAME: req.body.user_name,
                UserEMAIL: req.body.user_email,
                UserPASS: req.body.user_pass,
            })
            await user.save();
            res.status(200).json("Saved Sucessfully in MongoDB");
        }
        
    } catch(err){
        res.status(404).send(err);
    }
})

app.post("/SignIn", async(req, res)=>{
    const inpres = req.body;
    console.log("data received" + inpres);

    try{
        const dt = await userdb.findOne({
            $or: [
                { UserEMAIL: req.body.user_email, UserPASS: req.body.user_pass },
                { _id: req.body.urid }
              ]
        })
        console.log(dt);
        if(dt){
            res.json({message: "SignedIn Successfully", userName: dt.UserNAME, usrid: dt._id, Wishlist: dt.Wishlist});
        }
        else{
            res.json("User Not Found")
        }
    } catch(err){
        res.status(400).send(err);
    }
})

app.post("/details", async(req, res)=>{
    const data = req.body;
    
    try{
        const dt = await DbAdd.findOne({_id: data.id})
        const dt1 = await movie_row.findOne({_id: data.id})
        const dt2 = await toprateddb.findOne({_id: data.id})
        const dt3 = await actionrowdb.findOne({_id: data.id})
        const dt4 = await disneydb.findOne({_id: data.id})
        const dt5 = await pixardb.findOne({_id: data.id})
        const dt6 = await marveldb.findOne({_id: data.id})
        const dt7 = await starwardb.findOne({_id: data.id})
        if(dt){
            res.json(dt).status(200);}
        else if(dt1){
            res.json(dt1).status(200);}
        else if(dt2){
            res.json(dt2).status(200);}
        else if(dt3){
            res.json(dt3).status(200);}
        else if(dt4){
            res.json(dt4).status(200);}
        else if(dt5){
            res.json(dt5).status(200);}
        else if(dt6){
            res.json(dt6).status(200);}
        else if(dt7){
            res.json(dt7).status(200);}
        else{
            res.json("not found");
        }
    }catch(err){
        res.status(404).send(err);
    }
})

app.post('/review', async(req,res)=>{
    const data = req.body;

    try{
        const updatedMovie = await toprateddb.findOne({_id: data.id});
        const dbadd = await DbAdd.findOne({_id: data.id});
        const movierow = await movie_row.findOne({_id: data.id});
        const action = await actionrowdb.findOne({_id: data.id});
        const disney = await disneydb.findOne({_id: data.id});
        const pixar = await pixardb.findOne({_id: data.id});
        const marvel = await marveldb.findOne({_id: data.id});
        const starwar = await starwardb.findOne({_id: data.id});
        if(updatedMovie || dbadd || movierow || action || disney || pixar || marvel || starwar){
            res.json(updatedMovie || dbadd || movierow || action || disney || pixar || marvel || starwar).status(200);
        }
        else{console.log("not found")}
    } catch(err){
        res.status(404).send(err)
    }
})

app.post('/profile', async(req,res)=>{

    try{
        const dtt = await userdb.findOne({_id: req.body.urid})
        if(dtt){
            console.log(dtt.UserNAME);
            res.json({username: dtt.UserNAME, usrid: dt._id})
        }
        else{
            console.log("not found")
        }
    }catch(err){
        res.status(404).send("not found")
    }
})

app.patch('/updatereviewrating', async(req,res)=>{
    const data = req.body;

    try{
        const updatedMovie= await toprateddb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const dbadd= await DbAdd.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const movierow= await movie_row.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const action= await actionrowdb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const disney= await disneydb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const pixar= await pixardb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const marvel= await marveldb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )

        const starwar= await starwardb.findByIdAndUpdate(data.id, {
            $set: {
                [`reviews.${data.usr}`]:data.usrreview,
                [`ratings.${data.usr}`]:data.usrrating,
            }
        }, {new:true} )



        if (updatedMovie || dbadd || movierow || action || disney || pixar || marvel || starwar) {
            res.status(200).json("Updated Successfully");
          } else {
            res.status(404).json("Document not found");
          }

    } catch(err){
        res.send(err).status(404);
    }
})

app.patch('/wishlist', async(req,res)=>{
    try{
        const dtt = await userdb.findOne({_id: req.body.usr})
        if (!dtt.Wishlist.includes(req.body.id)) {
            dtt.Wishlist.push(req.body.id);
            await dtt.save();
            res.status(200).json('Data added to wishlist');
        } else{
            res.status(200).json('Item already exists in the wishlist');
        }
    }catch(err){
        res.json("We were unable to update, heres the error encountered" + err).status(404);
    }
})

app.get('/wishlistStatus', async(req,res)=>{
    const usr = req.query.usr;
    try{
        const dtt = await userdb.findOne({ _id: usr });
        if (dtt) {
            res.status(200).json({ Wishlist: dtt.Wishlist });
        } else {
            res.status(404).json("User not found" );
        }
    } catch (err) {
        res.status(500).json("Error fetching wishlist status");
    }
})

app.patch('/deletewish', async(req,res)=>{
    try{
        const dtt = await userdb.findOne({ _id: req.body.usr });
        if(dtt){
            let index = dtt.Wishlist.indexOf(req.body.id);
            dtt.Wishlist.splice(index,1);
            await dtt.save();
            res.status(200).json('Data deleted from wishlist');
        } else{
            console.log("user not found");
        }
    } catch(err){
        res.status(404).json("Error in deleting wishlist")
    }
})

app.post('/wishes', async(req,res)=>{
    try{
        const {wish_array}= req.body;
        console.log(wish_array);

        const result=[];

        for(const ele of wish_array){
            const dt = await DbAdd.findOne({ _id: ele });
            const dt1 = await movie_row.findOne({ _id: ele });
            const dt2 = await toprateddb.findOne({ _id: ele });
            const dt3 = await actionrowdb.findOne({ _id: ele });
            const dt4 = await disneydb.findOne({ _id: ele });
            const dt5 = await pixardb.findOne({ _id: ele });
            const dt6 = await marveldb.findOne({ _id: ele });
            const dt7 = await starwardb.findOne({ _id: ele });
            if (dt) {
                result.push(dt);
            } else if (dt1) {
                result.push(dt1);
            } else if (dt2) {
                result.push(dt2);
            } else if (dt3) {
                result.push(dt3);
            } else if (dt4) {
                result.push(dt4);
            } else if (dt5) {
                result.push(dt5);
            } else if (dt6) {
                result.push(dt6);
            } else if (dt7) {
                result.push(dt7);
            }
            else {
                res.json("not found");
            }
        }
        res.json(result).status(200);

    } catch(err){
        res.status(404).json("error in fetching users whishlist")
    }
})


app.listen(port, ()=>{
    console.log(`Server running successfully on port no. ${port}`);
})