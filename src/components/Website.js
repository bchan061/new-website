import React from 'react'

import Navbar from './Navbar'
import Intro from './Intro'
import ProjectContainer from './ProjectContainer'
import CourseContainer from './CourseContainer'

import Projects from './../data/Projects'
import Courses from './../data/Courses'

class Website extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Intro />
                <ProjectContainer projects={ Projects } />
                <CourseContainer courses={ Courses } />
            </div>
        )
    }
}

export default Website
