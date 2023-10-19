import { Component, useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {

    const [ char , setChar] = useState({});
 
    const {error , loading , getCharacter ,clearError} =  useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(() => {
            updateCharacter();
        }, 10000);

        return () => {
            clearInterval(timerId)
        }
    },[])

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * 400 + 1011000)
        getCharacter(id).then(onCharLoaded);
    }
   
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? < Spinner /> : null;
        const content = !(loading || error) ? < View char={char} /> : null;

        return (
            <div className="randomchar">
               {errorMessage}
               {spinner}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateCharacter} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    
}

const View = ({char}) =>{
    const { name , description , wikiBtn , homeBtn , image } = char;
    let alterDesc;
    let styleImage = { 'objectFit' : 'cover' };

    if(description != undefined && description.length === 0 ){
        alterDesc =  "Movcud deil !";
    }else{
        alterDesc = description;
    }

    if(char.image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        styleImage = { 'objectFit' : 'contain' }
    }


    return(
        <div className="randomchar__block">
        <img src={image} alt="Random character" style={styleImage} className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {alterDesc}
            </p>
            <div className="randomchar__btns">
                <a href={homeBtn} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wikiBtn} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;