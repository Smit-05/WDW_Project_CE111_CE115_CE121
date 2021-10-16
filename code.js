const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const path = require('path')

app.use(express.json());
app.use(express.static("public"));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get("/",function(request,response){
    response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo",async function(request,response){
    const videoURL = request.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    response.status(200).json(info);
});

app.get("/download",function(request,response){
    const videoURL = request.query.videoURL;
    const itag = request.query.itag;
    response.header("Content-Disposition",'attachment;\ filename="video.mp4"');
    ytdl(videoURL,{
        filter: format => format.itag == itag
    }).pipe(response);
});
app.listen(5000);