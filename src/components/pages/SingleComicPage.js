import { Link, useFetcher, useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComic.scss';

const SingleComicPage = () => {
    const [comic , setComic] = useState(null);
    const {comicId} = useParams();
    const {error , loading , clearError ,getComic} = useMarvelService();

    useEffect(() => {
        updateComic();
    },[comicId]);
    
    const updateComic = () => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    

    const errorContent = error ? <ErrorMessage /> : null;
    const loadingContent = loading ? <Spinner /> : null ;
    const mainConten = comic ? <View comic={comic} /> : null;
    

    return (
       <>
       {errorContent}
       {loadingContent}
       {mainConten}
       </>
    )
}

const View = ({comic}) => {

    return(
        <div className="single-comic">
            <img src={ comic[0].thumbnail.path + '.' + comic[0].thumbnail.extension} alt={comic[0].title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic[0].title}</h2>
                    <p className="single-comic__descr">{comic[0].description}</p>
                    <p className="single-comic__descr">{comic[0].pageCount} pages</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{comic[0].prices[0].price}</div>
                </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;