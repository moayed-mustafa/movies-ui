
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button } from 'reactstrap';

import Api from './Api'

export default
    function MovieDetails() {
        const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [movieId, setMovieId] = useState(id)
    const [isFlipped, setIsFlipped] = useState(true)

    // HTTP request
    useEffect(() => {

        async function getMovieDetails() {
            try {
                const res = await Api.getMovie(movieId)
                setMovie(data => data = res)
            } catch (e) {
                console.log(e)
            }
        }

        getMovieDetails()
        //  cleanup function
        return () => {}
    }, [movieId])

    //  flip movie card poster
    function flipImage() {
        setIsFlipped(! isFlipped)
    }
    return (


        <div className='movies-container' >


            {movie && <div className="card-wrapper" >
                <div className="movie-img-wrapper" onClick={flipImage}>
                    {
                    isFlipped?
                    <img className="movie-img" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie-display"></img>:
                    <img className="movie-img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="movie-display"></img>}
                </div>
                <div className="movie-info" >
                    <div className="movie-title"  >
                        <h5>{movie.title}</h5>
                    </div>
                    <div className="movie-descripition" >
                        <p>{movie.overview ? movie.overview : " Alas, no descreption available"}</p>
                        {movie.productoin_companies && movie.productoin_companies.map(company => (
                            <Badge color="warning">{company.name}</Badge>
                        ))}
                        {movie.genres && movie.genres.map(genre => (
                            <Badge className="m-1" color="warning">{genre.name}</Badge>
                        ))}
                        <p>Runtime: {movie.runtime} mins</p>
                        {movie.status === "Released" ?
                            <Badge color="success">Status: {movie.status} </Badge> :
                            <Badge color="warning">Status: {movie.status} </Badge>}
                    </div>
                    <Button color="success"
                        className="details-button m-2"
                        id={movie.id}
                    >Upvote</Button>
                    <Button color="danger"
                        className="details-button m-2"
                        id={movie.id}
                    >Downvote</Button>
                </div>
            </div>}
            </div>

        )

}