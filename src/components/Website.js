import React from 'react'

import WebsiteNavbar from './WebsiteNavbar'
import Intro from './Intro'
import CourseContainer from './CourseContainer'

class Website extends React.Component {
    render() {
        return (
            <div>
                <WebsiteNavbar />
                <Intro />
                <CourseContainer />
            </div>
        )
    }
}

export default Website
