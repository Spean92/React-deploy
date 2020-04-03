import * as React from 'react';
import classNames from 'classnames';

export class MovieTabs extends React.Component {

    componentDidMount() {
        console.log(`Movie Did Mount`)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.sort !== nextProps.sort) {
            return true;
        }
        return false;
    }

    render() {
        console.log(`movie render`);
        const { sort: sorting, sortMovies } = this.props;
        const clickHandler = (value) => () => sortMovies(value);
        const generateClass = (value) => {
            return classNames(`nav-link`, {'active': sorting === value})
        };
        return (
            <ul className="tab nav nav-pills mb-4">
                <li className="nav-item">
                    <button type="button"
                            className={generateClass(`popularity.desc`)}
                            onClick={clickHandler(`popularity.desc`)}>
                        Sort Popularity
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button"
                            className={generateClass(`revenue.desc`)}
                            onClick={clickHandler(`revenue.desc`)}>
                        Sort Revenue
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button"
                            className={generateClass(`vote_average.desc`)}
                            onClick={clickHandler(`vote_average.desc`)}>
                        Sort Vote average
                    </button>
                </li>
            </ul>
        )
    }
}
