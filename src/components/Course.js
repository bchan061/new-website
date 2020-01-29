import React from 'react'
import styled from 'styled-components'

import { Card, ListGroup, OverlayTrigger, Tooltip, Col } from 'react-bootstrap'

// Stagger cards
const CourseCard = styled(Card)`
    margin: 1em;
`

class Course extends React.Component {
    listItems(items) {
        if (!items) {
            return ''
        }
        let allItems = ''
        for (let i = items.length - 1; i >= 0; i--) {
            let item = items[i]
            allItems += item
            if (i > 0) {
                allItems += ', '
            }
        }
        return allItems
    }

    render() {
        return (
            <Col md={6}>
                <CourseCard>
                    <Card.Header> { this.props.course.number } </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <a href={this.props.course.link ? this.props.course.link : null}> { this.props.course.title } </a>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.listItems(this.props.course.languages)}</Card.Subtitle>
                        { this.props.course.projects && <b> Projects </b> }
                        <ListGroup>
                        { this.props.course.projects && this.props.course.projects.map((project, index) => (
                            <OverlayTrigger
                                key={index}
                                overlay={
                                    <Tooltip id={`tooltip-course-project-${index}`}>
                                        {project.description}
                                    </Tooltip>
                                }
                            >
                                <ListGroup.Item action={project.link} href={project.link}>
                                    { project.title }
                                </ListGroup.Item>
                            </OverlayTrigger>
                        ))}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        { this.props.course.term }
                    </Card.Footer>
                </CourseCard>
            </Col>
        )
    }
}

export default Course
