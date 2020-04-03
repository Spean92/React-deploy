import * as React from 'react'

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
            return `nav-link ${sorting === value ? "active": ""}`
        };
        return (
            <ul className="tab nav nav-pills mb-4">
                <li className="nav-item">
                    <div className={generateClass(`popularity.desc`)}
                         onClick={clickHandler(`popularity.desc`)}>
                        Sort Popularity
                    </div>
                </li>
                <li className="nav-item">
                    <div className={generateClass(`revenue.desc`)}
                         onClick={clickHandler(`revenue.desc`)}>
                        Sort Revenue
                    </div>
                </li>
                <li className="nav-item">
                    <div className={generateClass(`vote_average.desc`)}
                         onClick={clickHandler(`vote_average.desc`)}>
                        Sort Vote average
                    </div>
                </li>
            </ul>
        )
    }
}
