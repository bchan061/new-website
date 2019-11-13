import React from 'react'
import styled from 'styled-components'

import { Card, Container, Jumbotron, ListGroup, CardDeck } from 'react-bootstrap'

import Courses from './../data/Courses'

const CourseJumbotron = styled(Jumbotron)`
    background-color: hsl(134, 91%, 75%);
`

const CourseTitle = styled.h1`
    font-size: 3.5em;
    text-align: center;
    padding: 1em;
`

const ListGroupCourseItem = styled(ListGroup.Item)`
    margin: 1em 0;
`

const ListGroupContainer = styled(Container)`
    background-color: hsl(134, 91%, 70%);
`

class CourseContainer extends React.Component {
    constructor(props) {
        super(props)

        this.terms = new Map()
        Courses.map((course) => {
            let term = course.term
            if (!this.terms.has(term)) {
                this.terms.set(term, [])
            }
            this.terms.get(term).push(course)
        })
    }

    render() {
        return (
            <CourseJumbotron id="courses" fluid>
                <ListGroupContainer>
                    <CourseTitle>Courses</CourseTitle>

                    <ListGroup variant="flush">
                    {
                        this.terms && Array.from(this.terms.keys()).map((term, index) => {
                            let courses = this.terms.get(term)
                            return (
                                <ListGroupCourseItem key={index}>
                                    <h2>{term}</h2>
                                    {
                                        courses.map((course, index) => (
                                            <CardDeck>
                                                <Card key={index}>
                                                    <Card.Header> { course.number } </Card.Header>
                                                    <Card.Body>
                                                        <Card.Title>{ course.title }</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </CardDeck>
                                        ))
                                    }
                                </ListGroupCourseItem>
                            )
                        })
                    }
                    </ListGroup>
                </ListGroupContainer>
            </CourseJumbotron>
        )
    }
}

export default CourseContainer
