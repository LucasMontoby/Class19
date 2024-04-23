const express =  require('express');
const path = require("path");
const app = express();
const methodOverride  = require("method-override");

app.set('views', path.resolve(__dirname, './views'));
app.set( "view engine", "ejs" );

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

app.listen(3001 , ()=>{
    console.log("Server is running on port 3001")
});