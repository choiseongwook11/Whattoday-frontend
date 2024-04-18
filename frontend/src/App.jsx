import { BrowserRouter, Routes, Route} from "react-router-dom"
import React, {useState, useEffect} from "react"
import Main from "./main"
import Login from "./login"


const App = () => {

  const [data, setData] = useState(null)
  useEffect(()=> {
    fetch('http://localhost:80/api')
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.log(err))
  })

  return(
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/login" element={<Login />}/>
      </Routes>
      </BrowserRouter>
      
  )
}
export default App;