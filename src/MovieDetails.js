
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button } from 'reactstrap';
import { v4 as uuid } from 'uuid';

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

    //  Vote
    async function vote(e) {

        try {
            const { name } = e.target
            const userVote = name === "up"? 1: -1
            await Api.vote(movie.title, userVote, name)

        } catch (e) {
            console.log(e)
        }

    }

    //  flip movie card poster
    function flipImage() {
        setIsFlipped(!isFlipped)
    }
    console.log(movie)
    return (


        <div className='movies-container' >


            {movie && <div className="card-wrapper" key={uuid()} >
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
                        Genres:{movie.genres && movie.genres.map(genre => (
                            <Badge className="m-1" color="warning">{genre.name}</Badge>
                        ))}
                        <hr></hr>
                        Production:{movie.production_companies && movie.production_companies.map(company => (
                            <Badge className="m-1" color="danger">{company.name}</Badge>
                        ))}
                        <hr></hr>
                        <p> <Badge color="success"> Runtime: {movie.runtime} mins</Badge></p>
                        {movie.status === "Released" ?
                            <span key={uuid()} >
                            <Badge color="success" className="mr-1">Status: {movie.status}</Badge>
                            <Badge color="danger" >Release data: {movie.release_date} </Badge>
                            </span>
                            :
                            <span key={uuid()}>
                                <Badge color="warning" className="mr-1">Status: {movie.status} </Badge>
                                <Badge color="info" >Release data: {movie.release_date}</Badge>
                            </span>
                                }

                    </div>
                    <div>
                    <Button color="success"
                        className="details-button m-2"
                        id={movie.id}
                        name="up"
                        onClick={vote}
                    ><i className="far fa-thumbs-up"></i></Button>
                        <Badge color="success">upvotes: 456</Badge>
                        </div>
                    <div>
                    <Button color="danger"
                        className="details-button m-2"
                        id={movie.id}
                        name="down"
                            onClick={vote}>
                            <i className="far fa-thumbs-down"></i>
                        </Button>
                        <Badge color="danger">downvotes: 456</Badge>
                        </div>

                </div>
            </div>}
            </div>

        )

}