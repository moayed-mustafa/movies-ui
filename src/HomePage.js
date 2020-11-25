import React from 'react'
import { Jumbotron, Container } from 'reactstrap';


export default function HomePage() {
    return (
        <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Movies UI</h1>
          <p className="lead">Search for your favorite moveis</p>
        </Container>
      </Jumbotron>
    </div>
    )
}