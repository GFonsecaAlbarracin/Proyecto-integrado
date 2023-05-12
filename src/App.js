import './App.css';
import Cards from './components/Cards/Cards.jsx';
import style from './App.module.css';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import About from './components/About';
import Detail from './components/Detail';
import Forms from './components/form';
import Favorites from './components/favorites';

const EMAIL = 'gabriel29fnaf@gmail.com';
const PASSWORD = 'asd123';


function App() {
   const [characters, setCharacters] = useState([]);
   const {pathname} = useLocation();
   
   const navigate = useNavigate();
   const [access, setAccess] = useState(false)

   const login=(userData)=>{
      if(userData.password ===PASSWORD && userData.email === EMAIL){
         setAccess(true);
         navigate('/home')
      }
   }

   useEffect(()=>{
      !access && navigate('/');
   }, [access]);

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }
   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(charactersFiltered)
   }

   return (

      <div className='App'>
         {pathname !== '/' && <Nav onSearch={onSearch} />}
         <Routes>
            <Route path="/" element={<Forms login={login}/>}/>
            <Route path="/home" element={<Cards characters={characters} onClose={onClose} />}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
         </Routes>

      </div>
   );
}

export default App;
