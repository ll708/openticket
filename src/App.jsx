import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Shows from './pages/Shows';
import Login from './pages/login';
import Privacy from './pages/Privacy';
import FAQList from './pages/FAQList';


function App() {
 return (
  <BrowserRouter> 

   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/news" element={<News />} /> 
    <Route path="/shows" element={<Shows />} />
    <Route path="/login" element={<Login />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/FAQList" element={<FAQList />} />
    
   </Routes>

  </BrowserRouter>
 );
}

export default App;