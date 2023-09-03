import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{

    constructor(props){
        super(props);
        this.updateCharacter();
    }

    state = {
        char : {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error : false
        });
    }

    onError = () =>{
        this.setState({
            loading : false,
            error : true
        })
    }

    marvelService = new MarvelService();
    

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 400 + 1011000)
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)    
    }

    render(){
        const { char , loading , error} = this.state;
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
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) =>{
    const { name , description , wikiBtn , homeBtn , image } = char;
    let alterDesc;

    if(description != undefined && description.length === 0 ){
        console.log(description.length)
        alterDesc =  "Movcud deil !";
    }else{
        alterDesc = description;
    }


    return(
        <div className="randomchar__block">
        <img src={image} alt="Random character" className="randomchar__img"/>
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