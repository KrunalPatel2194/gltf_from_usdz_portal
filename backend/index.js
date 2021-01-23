const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const {PythonShell} =require('python-shell'); 
const app = express();
const fs = require('fs');
const { exec } = require("child_process");
const runPythonScript = () => {
    let options = { 
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time 
        //   scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional. 
        // args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1] 
    }; 
      
        PythonShell.run("pyScript.py", options, function (err, result){ 
            if (err) throw err; 
            // result is an array consisting of messages collected  
            //during execution of script. 
            console.log('result: ', result.toString()); 
          //   res.send(result.toString())
          return
      }); 
}
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// file upload api
app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    // console.log(myFile.name.split('.')[0])
    if (fs.existsSync('./gltf/'+myFile.name.split('.')[0])) {
        return res.status(200).send({msg:"Selected file already exists on server. Try upload new file!"});
    }else{
            //  mv() method places the file inside public directory
        myFile.mv(`${__dirname}/gltf/${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            runPythonScript();
            exec("ls -la", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            return res.send({name: myFile.name, path: `/${myFile.name}`,msg : "File has been converted successfuly!"}).status(200);
        });
    }
    
});

app.listen(4500, () => {
    console.log('server is running at port 4500');
})