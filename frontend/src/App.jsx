import { useState } from 'react';
import './App.css'
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {

  const [clicked, setClicked] = useState([])
  const [vertx, setVertx] = useState([])
  const [data, setData] = useState([])

  const changeColor = (id, i, j) =>{
    let vrtx = [i, j]
    if(clicked.length>2){
      clicked.shift()
      vertx.shift()
    }
    setClicked([...clicked, id])
    setVertx([...vertx, vrtx])
    console.log(clicked)
  }

  const getPath = () =>{
      axios.get('http://localhost:3000/find-path', { params: data })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  }

  const grid = ()=>{
    let content = []
    for(let i=0; i< 20; i++){
      for(let j=0; j<20; j++){
        let id = "id"+i+j
        let color = false
        if(clicked.length>0 && clicked[0]==id){
          color=true
        }
        if(clicked.length==2 && clicked[1]==id){
          color=true
        }
        content.push(
        <Button id={id}
          onClick={()=>{changeColor(id, i, j)}}
          variant="contained"
          {...(color ? {variant: 'outlined'} : {})}
          size="small">
            {i},{j}
        </Button>)
      }
      content.push(<br/>)
    }

    return content
  }

  return (
    <>
      {grid()}
      <br/>
      <Button onClick={()=>{getPath()}}>GET SHORTEST PATH</Button>
    </>
  )
}

export default App
