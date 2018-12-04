import React, { Component } from 'react';
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
    //console.log(body.results);
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
   * Renders 
   *    (i)   Genres multi selection box
   *    (ii)  Rating slide bar
   *    (iii) Movies list table
   */

  render() {
    
    return (
      
        <Movies results={this.state.results}
                genres={this.state.genres}
                options={this.state.options}
                imagePath={this.state.apiImagePath} 
        />
    );


  }
}

export default App;