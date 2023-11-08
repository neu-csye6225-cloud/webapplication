import express from "express";
import mysql from 'mysql2';
const app = express();
import logger from "../logger.js";
 // Adjust the path as needed

app.use(express.json());

//HTTP error except GET method
app.use((req, res, next) => {
  if (req.method!== 'GET') {

    res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(503).json();
  }
  next();
});

app.get('/healthz', async (req,res) => {
    res.json({message:'Route Protected!'})
    let isHealthy =false
    var connection = mysql.createConnection({
    host:"localhost",
    port: '3306',
    user:"root",
    password:"root@1234",
    database: "sys"
  });  
  logger.warn('Make sure to check the variable involved in connecting to database');
  if (Object.keys(req.body).length !== 0) {
    
    res.status(400).json();
    return;
  }
  
  if (Object.keys(req.query).length !== 0) {
    
    res.status(400).json();
  return;
  }
  
       connection.connect(function(err) {
          if (err) {
              isHealthy = false
          }else{
              isHealthy = true
          }
         console.log("Connected!");
         logger.info("Connected")
          if(isHealthy){  
            
            //add no cache header
            res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
  
            //success message
            res.status(200).json();
            
          }
          else{  

            //Add Cache Header
            res.status(503).json();
            
          }
        });
  });

  export default app;


