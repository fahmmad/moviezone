import React, { Component } from 'react';
import Filter from "./Filter";
import Movies from "./Movies";

import './App.css';
import 'rc-slider/assets/index.css';

class App extends Component {

  /*
   * define all state values in the constructor
   */
  constructor() {
    super();
    this.state = {
        apiHost: 'https://api.themoviedb.org/3/',
        apiParam: '&language=en-US&api_key=60dc7a8cd8cb533661f45052053130d9',
        apiImagePath: 'http://image.tmdb.org/t/p/w185/',
        results: [],        // movies list from all pages
        genres: undefined,  // genres map for lookup 
        options: [],        // options for genres selection
        filtered: [],       // selected genres
        selected: [],       // selected genres for selection display
        rating: 5,          // Movies rating, default: 5
    };
  }
  
  /*
   * Reads genre categories api to maintan a lookup
   * And reads all movies page by page
   */
  componentDidMount() {
    this.getGenres()
      .then(res => this.setState({ genres: res }))
      .catch(err => console.log(err));
    
    this.getMovies(1, 1);
  }

  /*
   * Movies can only be read per page per api
   * Repeat the api until all pages are requested
   * Stores the restuls in the state
   */
  getMovies = async (pageNum, totalPages) => {
    if(pageNum > totalPages) return;
    this.getMoviesPerPage(pageNum)
        .then(res => {
                this.setState({ results: [...this.state.results, ...res.results] }); 
                this.getMovies(pageNum+1, res.total_pages);
            })
        .catch(err => console.log(err));
  };

  /*
   * Reads movies for a given page
   */
  getMoviesPerPage = async (pageNum) => {
    const api = this.state.apiHost + 'movie/now_playing?page=' + String(pageNum) + this.state.apiParam;
    const response = await fetch( api );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body.results);
    return body;
  };

  /*
   * Reads all available genres and
   * prepares a lookup map
   */
  getGenres = async () => {
    const api = this.state.apiHost + 'genre/movie/list?' +  this.state.apiParam;
    const response = await fetch(api);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    this.setState({ options: body.genres.map(function(e) {return { value: e.id, label: e.name }}) })
    var map = new Map(); 
    body.genres.map(function(e) {
      return map.set(e.id, e.name);
    })
    
    return map;
  };
  
  /*
   * Filter movie list based on user request(genres, rating)
   */
  filterResults = (item) => {
    let selected = this.state.filtered;
    let rating = this.state.rating;
    for (let genre of selected) {   
      if(!item.genre_ids.includes(parseInt(genre.value))){
        return false;
      } 
    }
    return item.vote_average >= rating;           
  }

  /*
   * Onchanage of genre selection
   */
  onChangeGenre = (entry) => {
    let filtered = entry.map(item => 
      ({'id': 'genre_ids', 'value': String(item.value)}) 
      )
    this.setState({ filtered });
    this.setState({ selected: entry });
  };
  
  /*
   * Onchanage of rating slider
   */
  onChangeRating = (rating) => {
    console.log(rating);
    this.setState({ rating:rating.rating });
  };

  /*
   * Renders 
   *    (i)   Genres multi selection box
   *    (ii)  Rating slide bar
   *    (iii) Movies list table
   */

  render() {
    
    return (
      
      <div className="container">
        <header className="App-header">
          <br />
          <Filter selected={this.state.selected} 
                  options={this.state.options} 
                  rating={this.state.rating}
                  onChangeGenre={this.onChangeGenre} 
                  onChangeRating={this.onChangeRating} 
                  />
          <br />
        </header>
        
        <Movies data={this.state.results.filter(this.filterResults)}
                genres={this.state.genres}
                imagePath={this.state.apiImagePath} 
        />
        <br />
      </div>
    );


  }
}

export default App;