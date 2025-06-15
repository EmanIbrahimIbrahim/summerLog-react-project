import { Routes, Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import "./css/App.css";
import PrivateRoute from './PrivateRoute'
import WelcomePage from './pages/WelcomePage'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import AddPost from './pages/AddPost';
import { ToastContainer } from 'react-toastify';
import EditPost from './pages/EditPost';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
          <Route index element={<Posts />} /> 
          <Route path="myPosts" element={<MyPosts />} />
          <Route path="addPost" element={<AddPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="myPosts/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
