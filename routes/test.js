let {PythonShell} = require('python-shell');

exports.test = async (req,res) => {
    var PSOptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: []
    };

    PythonShell.run("app.py",PSOptions,function(err,result){
        if (err) console.log(err);
        else {
            res.send({ result: result });
            console.log(result);
        }
    });
}