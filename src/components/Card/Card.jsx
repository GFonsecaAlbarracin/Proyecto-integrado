import Nav from '../Nav/Nav';
import style from './Card.module.css'
import { NavLink } from 'react-router-dom';
import { addFav, removeFav } from '../../redux/actions'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'


const Card = ({ id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites }) => {

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      isFav ? removeFav(id) : addFav({ id, name, status, species, gender, origin, image, onClose })
      setIsFav(!isFav)
   };
   
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={style.contenedor} >
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         <NavLink to={`/detail/${id}`}>
            <p>Name: {name}</p>
         </NavLink>
         <p>Species: {species}</p>
         <p>Gender: {gender}</p>
         <p>Status: {status}</p>
         <p>Origin: {origin}</p>
         <img src={image} alt='' className={style.img} />
         <p></p>
         <button onClick={() => onClose(id)}>Close</button>
      </div>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

const mapStrateToProps = (state)=>{
  return{
   myFavorites: state.myFavorites
  }
}

export default connect(mapStrateToProps, mapDispatchToProps)(Card)