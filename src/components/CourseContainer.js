import React from 'react'
import styled from 'styled-components'

import { Container, Jumbotron, Row } from 'react-bootstrap'

import Courses from './../data/Courses'
import Course from './Course'

const CourseJumbotron = styled(Jumbotron)`
    background-color: hsl(134, 91%, 75%);
`

const CourseTitle = styled.h1`
    font-size: 3.5em;
    text-align: center;
    padding: 1em;
`

const CourseContainerList = styled(Container)`
    
`

class CourseContainer extends React.Component {
    render() {
        return (
            <CourseJumbotron id="courses" fluid>
                <CourseContainerList>
                    <CourseTitle>Courses</CourseTitle>
                    <Row>
                        {
                            Courses.map((course, index) => (
                                <Course key={index} course={course} />
                            ))
                        }
                    </Row>
                </CourseContainerList>
            </CourseJumbotron>
        )
    }
}

export default CourseContainer
