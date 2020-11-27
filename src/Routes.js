
import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchForm from './SearchForm'
import MovieDetails from './MovieDetails'
import MoviesList from './MoviesList'
import NotFound from './NotFound'
import HomePage from './HomePage'



export default function Routes() {
    const [moviesState, setMoviesState] = useState(null)

    return(
    <Router>
            <SearchForm setter={setMoviesState}/>
            <Switch>
            <Route exact path="/">
                    <HomePage/>
            </Route>
            <Route exact path="/movies">
                    <MoviesList data={moviesState}/>
            </Route>
            <Route exact path="/movies/:id">
                    <MovieDetails />
                </Route>
            <Route >
                    <NotFound/>
                </Route>


        </Switch>
        </Router>
    )
}
