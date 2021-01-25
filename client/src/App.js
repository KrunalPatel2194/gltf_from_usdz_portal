import React, { Component,useState,useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Animate from './components/animate/index';
import AddIcon from '@material-ui/icons/CloudDownload';
import Fab from '@material-ui/core/Fab';
import logo from './assets/logo.png';
import axios from  'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.nextechar.com/">
        NexTech AR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
}));

export default function App() {
    let alertText = document.getElementById('alert');
    if(alertText){
      alertText.style.visibility ="hidden";
    } 
    const [file, setFile] = useState(''); // storing the uploaded file
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const fileValidation = () => { 
      var fileInput =  
          document.getElementById('upload_gltf'); 
        
      var filePath = fileInput.value; 
    
      // Allowing file type 
      var allowedExtensions =  
              /(\.zip)$/i; 
        
      if (!allowedExtensions.exec(filePath)) { 
          alert('Please select file with a .zip extension!'); 
          fileInput.value = ''; 
          return false; 
      } 
  } 
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
        //File validation//
        fileValidation();
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            // onUploadProgress: (ProgressEvent) => {
            //     let progress = Math.round(
            //     ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
            //     setProgess(progress);
            // }
        }).then(res => {
            if(res.data.msg != ""){
              document.getElementById('alert').style.visibility ="visible";
              document.getElementById('alert').innerHTML = res.data.msg;
              //// axios.post('http://localhost:4500/convert', formData, {

              // });

            }
        }).catch(err => console.log(err))}
      const classes = useStyles();
  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{ backgroundImage :"url('https://wallpapercave.com/wp/wp2570978.png')"}} >
        {/* <Animate/> */}
        </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <img src={logo} />
          {/* <Typography component="h2" variant="h5">
            NextTech AR
          </Typography> */}
          {/* <form className={classes.form} noValidate > */}
            <input
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="upload_gltf"
              label="Upload GLTF"
              name="upload_gltf"
              className = {classes.input}
              type="file"
              onChange={handleChange}
              autoFocus
            />
            <label htmlFor="upload_gltf">
              <Button variant="contained" color="secondary" component="span">
                Select GLTF
              </Button>
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              id="upload"
              onClick = {uploadFile}
              
            >
              Upload & Convert
            </Button>
            <Box mt={5}>
              <a id="alert" style={{visibility:"hidden", color:"red"}}></a>
            </Box>
            
          {/* </form> */}
        </div>
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square style={{backgroundColor:"#fff",padding:"20px"}}>
        Converted files are ready for download. Click on a download button to download USD files.
        <Fab color="secondary" aria-label="add" style={{marginLeft:"10px"}}>
          <AddIcon />
        </Fab>
        </Grid>
        <Box mt={5}>
              <Copyright />
            </Box>
      </Grid>
    </Grid>
  );
}