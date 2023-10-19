import { useEffect ,useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char ,setChar] = useState(null);
    const {error , loading , clearError , request  , getCharacter} = useMarvelService();

    useEffect(()=>{
        updateChar();
    },[props.selectedChar])


    const updateChar = () => {
        const {selectedChar} = props;
        if(!selectedChar){
            return;
        }

        getCharacter(selectedChar)
            .then(onCharLoaded)
            
    }

    const onCharLoaded = (char) => {
        setChar(char);    
    }


        const skeleton = char || error || loading ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null ;
        const spinner = loading ? <Spinner /> : null;
        const content = !(!char || error || loading) ? < View char={char} /> : null;

        return (
            <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
            </div>
        )
    
}

const View = ({char}) =>{
    const {name , image , wikiBtn , description , homeBtn , comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
            if (char.image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
    return(
        <>
            <div className="char__basics">
                    <img src={image} style={imgStyle} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homeBtn} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wikiBtn} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.map((item, i )=>{
                        // eslint-disable-next-line
                        if(i > 9){
                            return;
                        }
                        return(
                            <li key={i} className="char__comics-item">
                            {item.name}
                            </li>
                        )
                    }) }
                </ul>
        </>
    )
}

export default CharInfo;