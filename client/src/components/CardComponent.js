import React from 'react'
import { Card, Button } from 'react-bootstrap';

export default function CardComponent(props) {
    const { movie } = props;
    const { overview, poster_path, title } = movie;
    return (
        <Card className="fav-card-container">
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{overview}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
    );
}
