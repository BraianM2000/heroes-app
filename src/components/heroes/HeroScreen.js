import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectors/getHeroeById'

export const HeroScreen = ({history}) => {

   const {heroeId} = useParams()


   const heroe = useMemo(() => getHeroeById(heroeId), [heroeId])

   if(!heroe){
       return <Redirect to="/"/>
   }

   const handleReturn= () =>{
       if(history.length<=2){
           history.push('/')
       }else{
       history.goBack()
   }}

   const{
        superhero,
        alter_ego,
        publisher,
        first_appearance,
        characters
   } = heroe

    return (

        <div className="row mt-5">
            <div className="col-4">
                <img src={`../assets/heroes/${heroeId}.jpg`} className="img-thumbnail  animate__animated animate__fadeInLeft" alt={superhero} /> 

            </div>
            <div className="col-8">
                <h3>
                    {superhero}
                </h3>
                <ul className="list-group list-group-flush"> 
                    <li className="list-group-items">
                        <b>
                           Alter ego:</b> {alter_ego}
                        
                    </li>

                    <li className="list-group-items">
                        <b> publisher: </b>{publisher}
                        
                    </li>

                    <li className="list-group-items">
                        <b>
                           first_appearance: </b> {first_appearance}
                       
                    </li>
                    <li className="list-group-items">
                        <b>
                           Alter ego: </b> {alter_ego}
                        
                    </li>

                    <h5>Characters</h5>
                    <p>{characters}</p>

                    <button 
                    className="btn btn-outline-info"
                    onClick={handleReturn} >
                        Return
                    </button>

                </ul>
            </div>
           
        </div>
    )
}
