import React from 'react'
import styled from 'styled-components'

import { Jumbotron, Row, Container, Tabs, Tab } from 'react-bootstrap'

import Projects from './../data/Projects'
import Courses from './../data/Courses'
import Project from './Project'

const ProjectJumbotron = styled(Jumbotron)`
    background-color: hsl(200, 91%, 75%);
`

const ProjectTitle = styled.h1`
    font-size: 3.5em;
    text-align: center;
    padding: 1em;
`

const ProjectTabs = styled(Tabs)`
    
`

class ProjectContainer extends React.Component {
    constructor(props) {
        super(props)
        this.releasedProjects = Projects.filter(project => project.released)
        this.unreleasedProjects = Projects.filter(project => !project.released)

        // Get all projects in the courses
        this.classProjects = []
        for (let course of [...Courses].reverse()) {
            if (course.projects) {
                let convertedProjects = [...course.projects].reverse().map(courseProject => ({
                    title: courseProject.title,
                    start: course.term,
                    course: `${course.number} - ${course.title}`,
                    summary: courseProject.description,
                    links: (courseProject.link ? [{
                        text: courseProject.writeup ? "Writeup" : "Description",
                        link: courseProject.link
                    }]: undefined),
                    image: courseProject.image
                }))
                this.classProjects.push(...convertedProjects)
            }
        }
        console.log(this.classProjects)
    }

    render() {
        return (
            <ProjectJumbotron id="projects" fluid>
                <Container>
                    <ProjectTitle>Projects</ProjectTitle>
                    <ProjectTabs defaultActiveKey="released" id="projects-tabs" variant="pills">
                        <Tab eventKey="released" title="Released">
                            <Row>
                                {
                                    this.releasedProjects.map((project, index) => (
                                        <Project
                                            key={index}
                                            index={index}
                                            project={project}
                                        />
                                    ))
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="class" title="Coursework">
                            <Row>
                                {
                                    this.classProjects.map((project, index) => (
                                        <Project
                                            key={index}
                                            index={index}
                                            project={project}
                                        />
                                    ))
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="personal" title="Personal">
                            <Row>
                                {
                                    this.unreleasedProjects.map((project, index) => (
                                        <Project
                                            key={index}
                                            index={index}
                                            project={project}
                                        />
                                    ))
                                }
                            </Row>
                        </Tab>
                    </ProjectTabs>
                </Container>
            </ProjectJumbotron>
        )
    }
}

export default ProjectContainer
