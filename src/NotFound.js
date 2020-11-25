import React from 'react'
import { Alert } from 'reactstrap';


export default function NotFound() {
    return (
        <div className="movies-container">
        <Alert color="warning">
            <h1>Page Not Found 404</h1>
        </Alert>
        </div>
    )
}