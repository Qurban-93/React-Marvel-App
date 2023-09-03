

class MarvelService{
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e17f1af1f8867a4028ec78e2342913a5';

    getResource = async (url) =>{
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , status :${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
         const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
         return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) =>{
        return {
            name : char.name,
            description : char.description,
            image : char.thumbnail.path +"." +char.thumbnail.extension,
            homeBtn : char.urls[0].url,
            wikiBtn : char.urls[1].url
        }
    }
}

export default MarvelService;