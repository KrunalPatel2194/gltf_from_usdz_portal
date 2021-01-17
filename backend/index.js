const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const {PythonShell} =require('python-shell'); 
const app = express();

const runPythonScript = () => {
    let options = { 
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time 
        //   scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional. 
        // args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1] 
    }; 
      
  
    // PythonShell.run('index.py', options, function (err, result){ 
    //       if (err) throw err; 
    //       // result is an array consisting of messages collected  
    //       //during execution of script. 
    //       console.log('result: ', result.toString()); 
    //     //   res.send(result.toString())
    //     return
    // }); 
    PythonShell.run("usd_from_gltf /gltf/x.gltf /usdz/x.usdz", options, function (err, result){ 
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
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/gltf/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        console.log("uploaded...running python script");
        runPythonScript();
        return res.send({name: myFile.name, path: `/${myFile.name}`}).status(200);
    });
})
app.listen(4500, () => {
    console.log('server is running at port 4500');
})