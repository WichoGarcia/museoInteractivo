const express = require('express');
const app = express();
const User = require("../models/usuario");
const Comment = require("../models/comment");
const Artwork = require("../models/artwork");
const bcrypt = require("bcrypt");



app.get('/', async function(req,res){
    res.render('index',{valido:'',autenticar:''});
    });

app.post('/',async function(req,res){
    var usuario = req.body.usuario;
    var passwordI = req.body.password;

    console.log(usuario);
    console.log(passwordI);

    User.findOne({usuario},async function(err,user){
        console.log(user);
        if(err){
            res.render('',{autenticar:'no',valido:''});
        }
        else if(!user){
            res.render('',{autenticar:'',valido:'no'});
        }
        else{
            isCorrectPassword(passwordI,user.password,(err,result)=>{
                if(err){
                    res.render('',{autenticar:'no',valido:''});
                }
                else if(result){
                    res.redirect("/menu");
                }
                else{
                    res.render('',{autenticar:'',valido:'no'});
                }
            });
        }
    });
});

app.get('/signUp', function(req,res){
res.render('signUp',{repetido:'Registro'});
})
app.post('/signUp',async function(req,res){
    bcrypt.hash(req.body.password,10, async function(err,hashedPass){
        if(err){
            next(err);
        }
        else{
            var usuario = new User({
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                correo: req.body.correo,
                password: hashedPass
                
            });
            await usuario.save(err =>{
                if(err){
                    res.render('signUp', {repetido:''});
                }
                else{
                    res.redirect("/menu");
                }
            });
        }
    });
})


app.get("/menu",function(req,res){
    res.render("menu");
})

var selection = undefined;

app.get("/solar",function(req,res){
	Artwork.find({gallery: "solar"}, async (error, docs) => {
		if (error) 
			console.log(error);
		else
			res.render("gallery", {
				gallery_name: 'Space Gallery',
				docs: docs,
				selected: selection
			});
	});
})

app.post('/view_img', (req, res) => {
	var img_name = req.body.img;

	var docs = Artwork.find({gallery: "solar"});

	Artwork.find({work_title: img_name}, async (error, doc) => {
		if (error)
			console.log(error);
		else {
			selection = doc[0];
			res.redirect('/solar');
		}
	});
});

function isCorrectPassword(passwordI,password,callback){
    bcrypt.compare(passwordI,password,function(err,same){
        if(err){
            callback(err);
        }
        else{
            callback(err,same);
        }
    });
}
module.exports = app;
