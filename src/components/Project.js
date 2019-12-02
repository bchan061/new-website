import React from 'react'
import styled from 'styled-components'

import { Button, Card, Col, Collapse, Carousel, Image, OverlayTrigger, Tooltip, Row } from 'react-bootstrap'

const ProjectColumn = styled(Col)`
    text-align: center;
`

const ProjectCard = styled(Card)`
    margin: 1em;
    cursor: pointer;
`

const ProjectCardFooter = styled(Card.Footer)`
    color: gray;
`

const ProjectCardTitle = styled(Card.Title)`
    font-weight: bold;
`
const ProjectCardSubtitle = styled(Card.Title)`
    color: darkgray;
    margin-bottom: 1em;
`

const ProjectToolImage = styled.img`
    height: 2em;
`

const ProjectImage = styled(Card.Img)`
    padding: 2px;
`

const HoverText = styled.p`
    color: gray;
`

const LinkButton = styled(Button)`    
    padding: 0.5em;
    margin: 0.5em;
    transition: 0.125s;

    &:hover {
        transform: scale(1.1);
        background-color: lightgray;
    }
`

const OtherLinkImage = styled(Image)`
    width: 2em;
    height: auto;
`

class Project extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showAll: false,
            permanent: false
        }

        this.click = this.click.bind(this)
        this.onHoverStart = this.onHoverStart.bind(this)
        this.onHoverEnd = this.onHoverEnd.bind(this)
    }

    click() {
        this.setState((previousState, props) => ({
            permanent: !previousState.permanent
        }))
    }

    shouldShow() {
        return this.state.permanent || this.state.showAll
    }

    onHoverStart() {
        this.setState((previousState, props) => ({
            showAll: true
        }))
    }

    onHoverEnd() {
        this.setState((previousState, props) => ({
            showAll: false
        }))
    }

    languagesToString() {
        let finalString = ''
        for (let i = 0; i < this.props.project.languages.length; i++) {
            let language = this.props.project.languages[i]
            let isFinal = i === this.props.project.languages.length - 1
            finalString += language
            if (!isFinal) {
                finalString += ', '
            }
        }
        return finalString
    }

    render() {
        return (
            <ProjectColumn md={6} sm={12} xs={12}>
                <ProjectCard
                    onClick={this.click}
                    onMouseEnter={this.onHoverStart}
                    onMouseLeave={this.onHoverEnd}
                    aria-controls={`projectCard-${this.props.index}`}
                    aria-expanded={this.shouldShow()}
                >
                    {
                        this.props.project.images && <ProjectImage variant="top" src={ `./images/${this.props.project.images.banner}` } />
                    }
                    {
                        this.props.project.image && <ProjectImage variant="top" src={this.props.project.image} />
                    }
                    <Card.Body>
                        <ProjectCardTitle> { this.props.project.title } </ProjectCardTitle>
                        <Card.Title>
                            {
                                this.props.project.links && this.props.project.links.map((link, index) => (
                                        <OverlayTrigger
                                            key={index}
                                            overlay={
                                                <Tooltip id={`tooltip-project-${index}`}>
                                                    {link.text}
                                                </Tooltip>
                                            }
                                        >
                                            <LinkButton
                                                key={index}
                                                href={link.link}
                                                variant="outline-secondary"
                                            >
                                                <span role="img" aria-label="Link">&#x1F517;</span>
                                            </LinkButton>
                                        </OverlayTrigger>
                                ))
                            }
                            {
                                this.props.project.github && <LinkButton href={this.props.project.github} variant="outline-secondary">
                                    <OtherLinkImage src="logos/github.png" alt="GitHub Source Code" />
                                </LinkButton>
                            }
                            {
                                this.props.project.soundcloud && <LinkButton href={this.props.project.soundcloud} variant="outline-secondary">
                                    <OtherLinkImage src="https://w.soundcloud.com/icon/assets/images/orange_white_32-94fc761.png" alt="SoundCloud" />
                                </LinkButton>
                            }
                        </Card.Title>
                            { this.props.project.languages && <ProjectCardSubtitle> {this.languagesToString()} </ProjectCardSubtitle> }
                            { this.props.project.course && <ProjectCardSubtitle> {this.props.project.course} </ProjectCardSubtitle> }
                        <Card.Text>
                            { this.props.project.summary }
                        </Card.Text>

                        {
                            this.props.project.description && 
                                <>
                                    <hr/>
                                    { !this.shouldShow() && <HoverText>Show more...</HoverText>}
                                    <Collapse in={this.shouldShow()}>
                                        <Card.Text id={`projectCard-${this.props.index}`}>
                                            { this.props.project.description }
                                        </Card.Text>
                                    </Collapse>
                                </>                            
                        }
                        {
                            this.props.project.tools && <>
                                <hr/>
                                <Carousel
                                    indicators={false}
                                    controls={this.props.project.tools && this.props.project.tools.length > 1}
                                >
                                    {
                                        this.props.project.tools && this.props.project.tools.map((tool, index) => (
                                            <Carousel.Item key={index}>
                                                <ProjectToolImage src={`logos/${tool}.svg`}  />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </>
                        }
                    </Card.Body>
                    <ProjectCardFooter>
                        { this.props.project.start }
                        { this.props.project.end && ` \u2013 ${this.props.project.end}` }
                    </ProjectCardFooter>
                </ProjectCard>
            </ProjectColumn>
        )
    }
}

export default Project
