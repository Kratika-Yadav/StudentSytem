
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper} from '@mui/material';
import Button from '@mui/material/Button';
import React,{useEffect, useState} from 'react';

export default function Student() {
  const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
  const [name,setName]=useState('')
  const[address,setAddress]=useState('')
  const[students,setStudents]=useState([])
  const handelClick =(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    })
  }
 useEffect(()=>{
  fetch("http://localhost:8080/student/getall")
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  }
)
 },[])


  return (

    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"blue"}}><u>Add Students</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth  
      value={name} onChange={(e)=>setName(e.target.value)}/>
      <TextField id="filled-basic" label="Student Address" variant="outlined" fullWidth
      value={address} onChange={(e)=>setAddress(e.target.value)} />
      <Button variant="contained" onClick={handelClick}>Submit</Button>
    </Box>
    </Paper>
    <Paper elevation={3} style={paperStyle}>
      {students.map(student=>(
      <Paper elevation={6}style={{margin:"10px", padding:"15px",textAlign:"left"}} key={student.id}>
       Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}
        </Paper> 
      ))}

</Paper>
    </Container>
  );
}
