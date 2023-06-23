//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.post('/device/',function(req,res){
    console.log("llego = "+req.body.id);
    if(req.body.texto==undefined || req.body.texto==null || req.body.texto.length<4){
        res.status(409);
        res.send("el texto no es valido");
    }else{
        
        res.status(200)
        res.send("Todo ok");
    } 
});

app.post('/updateStatus/', function(req, res){
    console.log("llego = " + req.body.id);
    if(req.body.id==undefined || req.body.id==null){
        res.status(409);
        res.send("Invalid ID");
    }else{
        var query = `UPDATE Devices SET state=${Boolean(req.body.status)} WHERE id=${req.body.id}`
        utils.query(query, function(err, rsp,fields){
            if(err==null){
                res.status(200)
                res.send("Updated successfully!");
            } else {
                res.status(500);
                res.send("An error has happened when trying to update status.");
            }
        });
        
    } 
});

app.post('/deleteDevice/', function(req, res){
    console.log("llego = " + req.body.id);
    if(req.body.id==undefined || req.body.id==null){
        res.status(409);
        res.send("Invalid ID");
    }else{
        var query = `DELETE FROM Devices WHERE id=${req.body.id}`
        utils.query(query, function(err, rsp,fields){
            if(err==null){
                res.status(200)
                res.send("Deleted successfully!");
            } else {
                res.status(500);
                res.send("An error has happened when trying to update status.");
            }
        });
        
    } 
});

app.post('/addDevice/', function(req, res){
    if(req.body.name==undefined || req.body.name==null || 
        req.body.description==undefined || req.body.description==null) {
        res.status(409);
        res.send("Invalid name or description.");
    } else {
        var query = `INSERT INTO Devices (name, description, state, type) VALUES 
            ('${req.body.name}', '${req.body.description}', ${req.body.state}, ${req.body.type});`
        utils.query(query, function(err, rsp,fields){
            if(err==null){
                res.status(200)
                res.send("Added successfully!");
            } else {
                res.status(500);
                res.send("An error has happened when trying to update status.");
            }
        });    
    } 
});


app.get('/devices/', function(req,res) {
    utils.query("select * from Devices",function(err,rsp,fields){
        if(err==null){
            res.send(JSON.stringify(rsp)).status(200);
        }
    });
});

/*app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
            
        },
    ]
    res.send(JSON.stringify(devices)).status(200);
});*/

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
