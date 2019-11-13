import React from 'react'
import styled from 'styled-components'

import SocialMedia from './../data/SocialMedia'

import { Button, Row, Col, Container, Image, Jumbotron } from 'react-bootstrap'

const IntroJumbotron = styled(Jumbotron)`
    background-color: white;
    text-align: center;
`

const IntroTitle = styled.h1`
    font-size: 5em;
`

const ProfilePicture = styled(Image)`
    width: 200px;
    height: 200px;
`

const SocialMediaImage = styled(Image)`
    width: 4em;
    height: auto;
`

const SocialMediaButton = styled(Button)`
    padding: 1em;
    margin: 1em;
    transition: 0.125s;

    &:hover {
        transform: scale(1.2);
    }
`

class Intro extends React.Component {
    render() {
        return (
            <IntroJumbotron fluid id="home">
                <Container>
                    <ProfilePicture className="mx-auto d-block" src="images/profile.jpg" roundedCircle />
                    <IntroTitle>Brandon Chan</IntroTitle>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            {
                                SocialMedia.map((socialMedia, index) => (
                                    <SocialMediaButton variant="outline-secondary" href={socialMedia.link} key={index}>
                                        <SocialMediaImage alt={socialMedia.name} src={`logos/${socialMedia.logo}`} />
                                    </SocialMediaButton>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </IntroJumbotron>
        )
    }
}

export default Intro
