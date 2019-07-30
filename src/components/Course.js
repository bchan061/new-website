import React from 'react'

class Course extends React.Component {
    render() {
        let title = this.props.data.number
        if (this.props.data.link) {
            title = ( <a href={ this.props.data.link }> {title} </a> )
        }
        return (
            <div className="course">
                <h1>
                    { title }
                </h1>
                <h2 className="titleDescription">
                    { this.props.data.title } ({ this.props.data.term })
                </h2>
                
                <p class="languages">
                    {
                        this.props.data.languages && this.props.data.languages.map((language, index) => {
                            if (index < this.props.data.languages.length - 1) {
                                return (
                                    <b key={index}>{ language }, </b>
                                )
                            } else {
                                return (
                                    <b key={index}>{ language }</b>
                                )
                            }
                        })
                    }
                </p>
                
                <p className="frameworks">
                    {
                        this.props.data.frameworks && this.props.data.frameworks.map((language, index) => {
                            if (index < this.props.data.frameworks.length - 1) {
                                return (
                                    <b key={index}>{ language }, </b>
                                )
                            } else {
                                return (
                                    <b key={index}>{ language }</b>
                                )
                            }
                        })
                    }
                </p>

                <div className="projects">
                    <ul className="projectList">
                        {
                            this.props.data.projects && this.props.data.projects.map((project, index) => {
                                let title = (<b> { project.title } </b>)
                                if (project.link) {
                                    title = (
                                        <a href={ project.link }>
                                            <b> { project.title } </b>
                                        </a>
                                    )
                                }
                                return (
                                    <li key={ index }>
                                        { title }: { project.description }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Course
