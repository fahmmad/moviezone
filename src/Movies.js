import React, { Component } from 'react';

class Movies extends Component{

    render() {
        return (
            <table>
            <tbody>
            {this.props.data.map(item =>
                <tr key={item.id}>
                <td>
                    <img alt={item.poster_path} src={item.poster_path ? this.props.imagePath + item.poster_path : ''}/>
                </td>
                <td style={{verticalAlign: 'top'}}>
                    <h2>Title: <span>{item.title}</span></h2>
                    <span><strong>Genre:</strong> { item.genre_ids.map(id => "[" + this.props.genres.get(id) + "]")}</span><br/>
                    <span><strong>Popularity:</strong> {item.popularity}</span><br/>
                    <span><strong>Rating:</strong> {item.vote_average}</span><br/>
                    <span><strong>Description:</strong> {item.overview}</span><br/>
                </td>
                </tr>
            )}
            </tbody>
            </table>
        )
    }
}

export default Movies;