var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.listen(80);
