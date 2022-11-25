var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
const fsExtra = require('fs-extra');
let {PythonShell} = require('python-shell');
const fs = require('fs');
const jsonFile = fs.readFileSync(__dirname + '/../productInform.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'yolov5/data/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg');
    }
});
  
const upload = multer({ storage: storage });

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/../pages/index.html'));
});

router.post('/send/image',upload.single("image"),function(req,res){
    var image;
    req.file ? image = `${req.file.filename}` : image = '';
    var PSOptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: [],
        scriptPath: 'yolov5',
        args: []
    };

    PythonShell.run("detect.py",PSOptions,function(err,result){
        if (err) console.log(err);
        else {
            const index = result[result.length - 2].split(" ");
            res.redirect('/print/' + index[0]);
        }
    });
});

router.get('/print/:index', function(req,res){
    fsExtra.emptyDirSync(__dirname + '/../yolov5/data/images');
    let index = req.params.index;
    let inform = [];
    jsonData.products.forEach(product => {
        if (product.index == index){
            inform.push(product);
        }
    });
    res.send(inform);
    //res.sendFile(path.join(__dirname + '/../pages/print.html'));
})

module.exports = router;