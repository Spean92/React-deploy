import React from 'react';

export class MovieItem extends React.Component {

    constructor() {
        super();
        this.state = {
            willWatch: false
        }
    }

    render() {
        const {movie, removeMovie, addMovieToWishList, removeMovieFromWL } = this.props;
        return (
            <div className="col-3 mb-4 ">
                <div className="card">
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <div>
                            <p>Rating: {movie.vote_average}</p>
                            {this.state.willWatch ?
                                <button type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            this.setState({
                                                willWatch: false
                                            });
                                            removeMovieFromWL(movie)
                                        }}
                                        >
                                    Watched
                                </button>
                            :
                                <button type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            this.setState({
                                                willWatch: true
                                            });
                                            addMovieToWishList(movie)
                                        }}>
                                    Will watch
                                </button>
                            }

                        </div>
                        <button type="button"
                                onClick={() => removeMovie(movie)}
                        >delete</button>
                    </div>
                </div>
            </div>
        )
    }

};