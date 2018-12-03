import React from 'react';
import ReactDOM from 'react-dom';
import Movies from "./Movies";

var createComponent = require('react-unit');

const movies = [
    {vote_count: 2669, id: 335983, video: false, vote_average: 6.5, popularity: 490.168, genre_ids: [878], poster_path: "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg", title: "Venom", overview: "Eddie Brock is a reporter—investigating "},
    {vote_count: 1717, id: 338952, video: false, vote_average: 7, popularity: 285.185, genre_ids: [10751, 14, 12], poster_path: "/uyJgTzAsp3Za2TaPiZt2yaKYRIR.jpg", title: "Fantastic Beasts: The Crimes of Grindelwald", overview: "Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating .."},
    {vote_count: 127, id: 375588, video: false, vote_average: 6.3, popularity: 258.863, genre_ids: [12, 28], poster_path: "/AiRfixFcfTkNbn2A73qVJPlpkUo.jpg", title: "Robin Hood", overview: "A war-hardened Crusader and his Moorish commander mount an audacious revolt against ..."},
    {vote_count: 87, id: 507569, video: false, vote_average: 5.6, popularity: 246.76, genre_ids: [28, 12, 14, 16], poster_path: "/r6pPUVUKU5eIpYj4oEzidk5ZibB.jpg", title: "The Seven Deadly Sins: Prisoners of the Sky", overview: "Traveling in search of the rare ingredient, “sky fish”  Meliodas ..."},
    {vote_count: 1744, id: 424694, video: false, vote_average: 8.2, popularity: 230.318, genre_ids: [18, 10402], poster_path: "/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg", title: "Bohemian Rhapsody", overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist ..."},
    {vote_count: 1004, id: 346910, video: false, vote_average: 5.2, popularity: 188.818, genre_ids: [878, 28, 53, 12], poster_path: "/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg", title: "The Predator", overview: "When a kid accidentally triggers the universe's most lethal hunters' ..."}
  ];
const genres = new Map([ [28, "Action"], [12, "Adventure"], [16, "Animation"], [35, "Comedy"], [80, "Crime"], [99, "Documentary"],
  [18, "Drama"], [10751, "Family"], [14, "Fantasy"], [36, "History"], [27, "Horror"], [10402, "Music"], [9648, "Mystery"],
  [10749, "Romance"], [878, "Science Fiction"], [10770, "TV Movie"], [53, "Thriller"], [10752, "War"], [37, "Western"] ]);


const imagePath = "http://image.tmdb.org/t/p/w185/";
  
describe('Movies', () => {
    it('should echo the value', () => {
        var component = createComponent(<Movies data={movies} genres={genres} imagePath={imagePath} />);

        var img = component.findByQuery('img')[0];

        expect(img.props.src).toBe(imagePath+movies[0].poster_path);
        });
  
    it('must display title', () => {
        var component = createComponent(<Movies data={movies} genres={genres} imagePath={imagePath} />);

        var span = component.findByQuery('span')[0];
        expect(span.text).toBe(movies[0].title);
    });

    it('must display genre', () => {
        var component = createComponent(<Movies data={movies} genres={genres} imagePath={imagePath} />);

        var span = component.findByQuery('span')[1];
        expect(span.text).toBe( "Genre: [" + genres.get(movies[0].genre_ids[0])+"]" );
    });
});