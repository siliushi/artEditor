const path = require('path'),
    express = require('express'),
    compress = require('compression'),
    app = express(),
    fs = require('fs-extra'),
    port = '9091',
    serverIP = '0.0.0.0';
const bodyParser = require('body-parser');
// GZIP压缩
app.use(compress());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use('/', express.static(__dirname));
app.use('/example', express.static(path.join(__dirname, "../example")));
app.use('/dist', express.static(path.join(__dirname, "../dist")));


/**
 * base64格式上传
 * @date   2018-01-19
 * @param  {[type]}   req    [description]
 * @param  {[type]}   res){                 let imgData [description]
 * @return {[type]}          [description]
 */
app.post('/base64Upload', function(req, res){
    let imgData = req.body.image;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let url = path.join("image", (new Date().getTime() + ".png"));
    fs.outputFile(url, dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("http://" + serverIP + ":" + port + "/" + url);
        }
    });
});


app.get('/', function(req, res) {
    res.sendFile(path.join(path.resolve('.'), '../index.html'));
})


app.listen(port, serverIP, function() {
    console.log('server running at ' + serverIP + ':' + port);
});
