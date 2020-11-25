

import axios from 'axios';

const BASE_URL = "http://127.0.0.1:3001"

export default class API{
    static async search(movie) {
        try {
            const res = await axios.get(`${BASE_URL}/${movie}`)
            return res.data;

        } catch (e) {
            console.log(e)
        }
    }

    static async getMovie(id) {
        try {
            const res = await axios.get(`${BASE_URL}/movie/${id}`)
            return res.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async vote(title, user_vote, direction) {
        try {
          await axios.post(`${BASE_URL}/movie/${direction}`,{ title, user_vote, direction })

        } catch (e) {
            console.log(e)
        }
    }

}