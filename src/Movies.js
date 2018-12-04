import React, { Component } from 'react';
import Filter from "./Filter";

class Movies extends Component{

  /*
   * define all state values in the constructor
   */
  constructor(props) {
    super(props);
    this.state = {
        options: [],                                      // options for genres selection
        filtered: props.filtered?props.filtered:[],       // selected genres
        selected: [],                                     // selected genres for selection display
        rating: props.rating ? props.rating : 5,          // Movies rating, default: 5
    };
  }
  
  componentDidMount() {
  }

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

    render() {
        let data = this.props.results ? this.props.results.filter(this.filterResults):[];
        return (
            <div className="container">
              <header className="App-header">
                  <br />
                  <Filter selected={this.state.selected} 
                          options={this.props.options} 
                          rating={this.state.rating}
                          onChangeGenre={this.onChangeGenre} 
                          onChangeRating={this.onChangeRating} 
                          />
                  <br />
                </header>
                <table>
                <tbody>
                {data.map(item =>
                    <tr key={item.id}>
                    <td>
                        <img ref="poster_path" alt={item.poster_path} src={item.poster_path ? this.props.imagePath + item.poster_path : ''}/>
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <h2>Title: <span>{item.title}</span></h2>
                        <span><strong>Genre:</strong> { item.genre_ids.map(id => "[" + this.props.genres.get(id) + "]")}</span><br/>
                        <span><strong>Popularity:</strong> {item.popularity}</span><br/>
                        <span><strong>Rating:</strong></span> <span>{item.vote_average}</span><br/>
                        <span><strong>Description:</strong> {item.overview}</span><br/>
                    </td>
                    </tr>
                )}
                </tbody>
                </table>
                <br />
            </div>
        
        )
    }
}
export default Movies;