import React from 'react'

class Project extends React.Component {
    constructor(props) {
        super(props)
        
        this.clickHandler = this.clickHandler.bind(this)
    }
    
    clickHandler(e) {
        e.preventDefault()
        this.props.onClick(this.props.data)
    }
    
    render() {
        return (
            <a className="project" href="#" onClick={ this.clickHandler }>
                <figure className="projectCell projectImageAndTitle">
                    <img className="projectBanner" src={ "./images/" + this.props.data.images.banner } alt={ this.props.data.title } />
                    <figcaption>
                        <span className="projectTitle">
                            { this.props.data.title }
                        </span>
                        <br/>
                        <span>
                            { this.props.data.start }
                        </span>
                    </figcaption>
                </figure>
                <div className="projectCell projectDescription">
                    <p>
                        { this.props.data.summary }
                    </p>
                    <span className="toolContainer">
                        {
                            this.props.data.tools && this.props.data.tools.map((tool, index) => {
                                return (
                                    <img className="toolImage" src={ "./logos/" + tool + ".svg" } key={index} />
                                )
                            })
                        }
                    </span>
                </div>
            </a>
        )
    }
}

export default Project
