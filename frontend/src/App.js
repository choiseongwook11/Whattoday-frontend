import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./main"
import Mainlin from "./mainlin"
import LoginMain from "./loginmain"


const App = () => {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/mainlin" element={<Mainlin />}/>
        <Route path="/loginmain" element={<LoginMain />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App