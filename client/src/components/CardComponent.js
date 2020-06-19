import React from 'react'
import { Card, Button, Jumbotron, Image } from "react-bootstrap";
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../actions';

const Header1 = styled.h1`
  text-align: center;
`
const SmallHeader = styled.h4`
  text-align: center;
`
const OverView = styled.div`
  padding: 0.5em;
  font-size: 1.2em;
`;
const TextArea = styled.p`
  font-size: 16px;
`
export default function CardComponent(props) {
    const { movie } = props;
    const { overview, poster_path, title, backdrop_path } = movie;
    let released = moment(movie.release_date).format('LL');
    const dispatch = useDispatch();
    const handleDelete = (id) => {
      dispatch(actions.deleteMovie(id))
    }
    return (
      // <Card className="fav-card-container">
      //   <Card.Img
      //     variant="top"
      //     src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
      //   />
      //   <Card.Body>
      //     <Card.Title>{title}</Card.Title>
      //     <Card.Text>{overview}</Card.Text>
      //     <Button variant="primary">Go somewhere</Button>
      //   </Card.Body>
      // </Card>
      <Jumbotron>
        <Header1>{title}</Header1>
        <SmallHeader>Released: {released}</SmallHeader>
        <Image
          src={`https://image.tmdb.org/t/p/original//${backdrop_path}`}
          fluid
        />
        <OverView>
          {overview}
        </OverView>
        <p>
          <Button onClick={() => handleDelete(movie.id)} variant="danger">Remove From Favorites</Button>
        </p>
      </Jumbotron>
    );
}
