const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
var port=process.env.PORT || 3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>
{
  return new Date().getFullYear()+' This is from Helper';
})
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>
{
  var logMessage=`${new Date().toString()}  :${req.method}: ${req.url} \n`;
  console.log(logMessage);
  fs.appendFile(__dirname+'/logs/webserver.log',logMessage,(error)=>
  {
    if(error)
    {
    console.log(`error while writing log file ${error}`);
    res.render('maintanance.hbs');
    }
    else{
      next();
    }
  });
});
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>
{
res.render('home.hbs',{
  MyName:'Chandresh Tundi',
  bodyH1Text:'Welcome this is root page',
  bodyParaText:'random text',
})
});
hbs.registerHelper('screamIt',(message)=>
{
  return message.toUpperCase(message);
})
app.get('/json',(req,res)=>
{
res.send({
  name:'chandresh',
  likes:['bat','ball','football','kabaddi']
})
});



app.get('/about',(req,res)=>
{
res.render('about.hbs',{
  MyName:'Chandresh Shukla',
  bodyH1Text:'About page Title',
  bodyParaText:'this is some details which nneds to be filled into Para for about page',
})
});


app.get('/bad',(req,res)=>
{
res.error('error occured');
});

app.get('/scanii',(req,res)=>
{
console.log("scanni url hitting.............\n");
console.log(JSON.stringify(req));
console.log("scanni url request above.............\n");

res.send({
  name:'test',
  likes:['bat']
});
});



app.listen(port,()=>{
  console.log(`server is up on the port ${port}`);
});
