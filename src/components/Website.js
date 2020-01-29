import React from 'react'

import WebsiteNavbar from './WebsiteNavbar'
import Intro from './Intro'
import CourseContainer from './CourseContainer'
import ProjectContainer from './ProjectContainer'

class Website extends React.Component {
    render() {
        return (
            <div>
                <WebsiteNavbar />
                <Intro />
                <ProjectContainer />
                <CourseContainer />
            </div>
        )
    }
}

export default Website
