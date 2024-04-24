import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./main"
import Mainlin from "./mainlin"
import LoginMain from "./loginmain"
import MyPage from "./MyPage"
import MyPageEdit from "./MyPageEdit"


const App = () => {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/mainlin" element={<Mainlin />}/>
        <Route path="/loginmain" element={<LoginMain />}/>
        <Route path="/MyPage" element={<MyPage />}/>
        <Route path="/MyPageEdit" element={<MyPageEdit />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App