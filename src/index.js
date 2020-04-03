import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
//import * as serviceWorker from './serviceWorker';
import { MovieItem } from "./movieItem";
import { MovieTabs } from "./MovieTabs";
import { API_KEY_3, API_URL } from "./utils";
import { Paggination } from "./paggination";

function Image(props) {
    return <img src={props.src} alt={props.alt}/>
}

//

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            like: false,
            movies: [],
            wishList: [],
            sorting: `popularity.desc`,
            current_page: 1,
            total_pages: 0
        };

        this.removeMovie = this.removeMovie.bind(this);
        console.log(`App Constructor`);
    }
    operations = {
        "+": value => ++value,
        "-": value => --value
    };
    timeout = null;

    componentDidMount() {
        console.log(`App Did Mount`);
        this.getMovies();
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(`App Did Update`);
        if(prevState.sorting !== this.state.sorting || prevState.current_page !== this.state.current_page) {
            this.getMovies();
        }
    }
    getMovies = () => {
        fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&page=${this.state.current_page}&sort_by=${this.state.sorting}`)
            .then(result => result.json())
            .then(data => {
                this.setState({
                    movies: data.results,
                    current_page: data.page,
                    total_pages: data.total_pages
                })
            })
    };

    removeMovie = (movie) => {
        this.setState({movies: this.state.movies.filter((e) => movie.id !== e.id)})
    };
    addMovieToWishList = movie => {
        this.setState((currentState, props) =>  {
            return {wishList: [...currentState.wishList, movie]}
            }
        )
    };
    removeMovieFromWL = (movie) => {
        this.setState((currentState, props) => {
            return currentState.wishList = currentState.wishList.filter((m) => movie.id !== m.id)
        })
    };
    sortMovies = (method) => {
        this.setState({
            sorting: method
        })
    };
    changePage = (direction) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.setState({
                current_page: this.operations[direction](this.state.current_page)
            });
        }, 100);
    };

    render() {
        console.log(`App Render`);
        return <div className="container mt-4">
            <div className="row">
                <div className="col-9">
                    <MovieTabs sort={this.state.sorting}
                               sortMovies={this.sortMovies}/>
                    <div className="row">
                        {
                            this.state.movies.map((mov, i) => {
                                return <MovieItem key={mov.id}
                                                  movie={mov}
                                                  removeMovie={this.removeMovie}
                                                  addMovieToWishList={this.addMovieToWishList}
                                                  removeMovieFromWL={this.removeMovieFromWL}
                                />

                            })
                        }
                    </div>
                </div>
                <div className="col-3">
                    <p>Will watch: {this.state.wishList.length}</p>
                    <Paggination current_page={this.state.current_page}
                                 total_pages={this.state.total_pages}
                                 changePage={this.changePage} />
                </div>
            </div>
        </div>
    }
}

function App() {
    return <MovieList/>
}

ReactDOM.render(<App/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
