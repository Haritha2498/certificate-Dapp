const express=require('express');
const app=express();
const port=3000;
app.use(express.json());

const path=require('path');

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

const certidata=[];         //array declared for storing form values
//router for home page
app.get('/',(req,res)=>                                 
{
res.sendFile(path.join(__dirname,'public','home.html'))
})

//router for form page
app.get('/form',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','certiform.html'))
})

//router for certificate page

app.get('/certificate',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','issuecerti.html'))
    
})

//router for getting details form form page while submitting the form;
//get the data from form as parameter of request and store in the array;

app.post('/submitform',(req,res)=>
{   
    
    const {course, cerid, name, grade, date}=req.body;
    console.log(req.body);
    const newdata ={course, cerid, name, grade, date};
    certidata.push(newdata);
    res.redirect('/certificate');
})



app.get('/form/:id',(req,res)=>
{
    const id=req.params.id;
    //const dataa=certidata.find(cdata=>cdata.cerid==id);
    
    if(!id)
    {
        return res.status(404).send("certificate not found"+id)
    }
    
        res.sendFile(path.join(__dirname,'public','/certificate'))
    
})



app.get('api/form/:id',(req,res)=>
{
    const id=req.params.id;
    const dataa=certidata.find(cdata=>cdata.cerid==id);
    if(!dataa){
        return res.status(404).send("not found");
    }
    
        res.json(dataa)
    

})

app.listen(port,()=>
{
    console.log("running in port: "+port)
})


