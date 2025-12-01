import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Privacy from './pages/Privacy';
import FAQList from './pages/FAQList';
import FormPage from './pages/FormPage';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberPage from './pages/MemberPage';


function App() {
 return (
  <BrowserRouter> 

   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/news" element={<News />} /> 
    <Route path="/events" element={<Events />} />
    <Route path="/events/detail/:id" element={<EventDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/FAQList" element={<FAQList />} />
    <Route path="/FormPage" element={<FormPage />} />
    <Route path="/register" element={<Register />} />
    <Route path="/Member/*" element={<MemberPage />} />
    <Route path="/Ticket" element={<SelectTicket />} />
    
   </Routes>

  </BrowserRouter>
 );
}

export default App;