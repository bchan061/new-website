import React from 'react'
import styled from 'styled-components'

import SocialMedia from './../data/SocialMedia'

import { Button, Row, Col, Container, Image, Jumbotron } from 'react-bootstrap'

const IntroJumbotron = styled(Jumbotron)`
    background-color: white;
    text-align: center;
    padding-top: 70px;
`

const IntroTitle = styled.h1`
    font-size: 3em;
`

const DescriptionColumn = styled(Col)`
    font-size: 2em;
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
    padding: 0.5em;
    margin: 0.5em;
    transition: 0.125s;
    color: blue !important;

    &:hover {
        transform: scale(1.1);
        background-color: lightgray;
    }
`

class Intro extends React.Component {
    render() {
        return (
            <IntroJumbotron fluid id="home">
                <Container>
                    <Row>
                        <Col md={4} sm={12}>
                            <ProfilePicture className="mx-auto d-block" src="images/profile.jpg" roundedCircle />
                            <IntroTitle>Brandon Chan</IntroTitle>
                            <Row className="justify-content-md-center">
                                <Col>
                                    {
                                        SocialMedia.map((socialMedia, index) => (
                                            <SocialMediaButton variant="outline-secondary" href={socialMedia.link} key={index}>
                                                <SocialMediaImage alt={socialMedia.name} src={`logos/${socialMedia.logo}`} />
                                            </SocialMediaButton>
                                        ))
                                    }
                                    <SocialMediaButton variant="outline-secondary" href="./other/Resume.pdf">
                                        Resume
                                    </SocialMediaButton>
                                </Col>
                            </Row>
                        </Col>
                        <DescriptionColumn className="my-auto">
                            <Jumbotron>
                                Graduating from UC Berkeley in December 2019.
                                Looking for full-time opportunities in software engineering, web development, or data science.
                            </Jumbotron>
                        </DescriptionColumn>
                    </Row>
                </Container>
            </IntroJumbotron>
        )
    }
}

export default Intro
