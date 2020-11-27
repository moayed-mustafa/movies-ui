
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
    const [votes, setVotes] = useState({thumbs_up:0, thumbs_down: 0})
    const [isFlipped, setIsFlipped] = useState(true)
    const [upVoteDisabled, setUpVoteDisabled] = useState(false)
    const [downVoteDisabled, setDownVoteDisabled] = useState(false)

    // HTTP request
    useEffect(() => {

        async function getMovieDetails() {
            try {
                const res = await Api.getMovie(movieId)
                setMovie(data => data = res)
                // get the vote from database
                const votesRes = await Api.getVotes(res.title)
                const { movieExist, votes } = votesRes
                if (movieExist) {
                    setVotes(votes)
                }
            } catch (e) {
                console.log(e)
            }
        }

        getMovieDetails()

        //  cleanup function
        return () => {}
    }, [setMovie, movieId])

    //  Vote
    async function vote(e) {

        try {
            const { name, id } = e.target
            const userVote = name || id === "up"? 1: -1
            await Api.vote(movie.title, userVote, name || id)
            // update votes:
            const votesRes = await Api.getVotes(movie.title)
            const { votes } = votesRes
            setVotes(votes)
            // disable button
            if (name || id === "up") {
                setUpVoteDisabled(true)
                setDownVoteDisabled(false)
            }
            else {
                setDownVoteDisabled(true)
                setUpVoteDisabled(false)
            }

        } catch (e) {
            console.log(e)
        }

    }

    //  flip movie card poster
    function flipImage() {
        setIsFlipped(!isFlipped)
    }
    return (


        <div className='movies-container'  >
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
                            <Badge key={uuid()} color="warning">{company.name}</Badge>
                        ))}
                        <Badge color="info"><b>Genres:</b></Badge>{movie.genres && movie.genres.map(genre => (
                            <Badge key={uuid()}className="m-1" color="warning">{genre.name}</Badge>
                        ))}
                        <hr></hr>
                        <Badge color="info"><b>Production:</b></Badge>{movie.production_companies && movie.production_companies.map(company => (
                            <Badge key={uuid()}className="m-1" color="danger">{company.name}</Badge>
                        ))}
                        <hr></hr>
                        <p> <Badge color="success"> Runtime: {movie.runtime} mins</Badge></p>
                        {movie.status === "Released" ?
                            <span  >
                            <Badge color="success" className="mr-1">Status: {movie.status}</Badge>
                            <Badge color="danger" >Release data: {movie.release_date} </Badge>
                            </span>
                            :
                            <span >
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
                         disabled={upVoteDisabled}
                        onClick={vote}
                    ><i className="far fa-thumbs-up" id="up"></i></Button>
                        <Badge color="success">upvotes:{votes.thumbs_up} </Badge>
                    </div>

                    <div>
                    <Button color="danger"
                        className="details-button m-2"
                        id={movie.id}
                        name="down"
                         disabled={downVoteDisabled}
                        onClick={vote}>
                            <i  id="down"className="far fa-thumbs-down"></i>
                        </Button>
                        <Badge color="danger">downvotes:{votes.thumbs_down} </Badge>
                        </div>

                </div>
            </div>}
            </div>

        )

}