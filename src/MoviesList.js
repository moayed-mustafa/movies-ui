
import React from 'react'
import { Button, Alert }
    from 'reactstrap';
    import { v4 as uuid } from 'uuid';
  import {useHistory} from 'react-router-dom'

export default
    function MoviesList({ data }) {
    const history = useHistory()
    function redirectToMovieDetails(e) {
        history.push(`/movies/${e.target.id}`)
    }
    return (

        <div className="movies-container">

            {data === null ? <Alert color="warning"><h1>No movies to display</h1></Alert>
                : data.map(movie => (
                <div className="card-wrapper"  key={uuid()}>
                    <div className="movie-img-wrapper" >
                        <img className="movie-img" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie-display"></img>
                    </div>
                    <div className="movie-info" >
                        <div className="movie-title"  >
                            <h5>{movie.title}</h5>
                        </div>
                        <div className="movie-descripition" >
                            <p>{movie.overview?movie.overview: " Alas, no descreption available"}</p>
                        </div>
                            <Button color="light"
                                className="details-button"
                            id={movie.id}
                            onClick={redirectToMovieDetails}
                        >Details</Button>
                    </div>
                </div>

            ))}
        </div>
    )
    }