import React from 'react'

import Course from './Course'

class CourseContainer extends React.Component {
    render() {
        return (
            <div id="courses">
                <h1 className="largeTitle centeredText">
                    Courses
                </h1>
                <h2 className="titleDescription">
                    This includes important classes that I've taken in my time in the University of California, Berkeley (Fall 2017 - Fall 2019).
                </h2>
                {
                    this.props.courses && this.props.courses.map((course, index) => {
                        return (
                            <Course data={ course } />
                        )
                    })
                }
            </div>
        )
    }
}

export default CourseContainer
