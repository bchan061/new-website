import React from 'react'

import Carousel from './Carousel'

class ProjectModal extends React.Component {
    constructor(props) {
        super(props)
        
        this.clickHandler = this.clickHandler.bind(this)
    }
    
    clickHandler(e) {
        if (e.target.className == 'projectModal' || e.target.className == 'projectModalHeader') {
            e.preventDefault()
            this.props.onExit()
        }
    }
    
    render() {
        if (this.props.data) {
            return (
                <div className="projectModal" onClick={ this.clickHandler }>
                    <div className="projectModalContent">
                        <div className="projectModalVerticalContainer">
                            <div className="projectModalContainer">
                                <div className="projectImageAndTitle">
                                    <figure>
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
                                    <p className="languages">
                                    {
                                        this.props.data.languages && this.props.data.languages.map((language, index) => {
                                            if (index < this.props.data.languages.length - 1) {
                                                return (
                                                    <b>{ language }, </b>
                                                )
                                            } else {
                                                return (
                                                    <b>{ language }</b>
                                                )
                                            }
                                        })
                                    }
                                    </p>
                                </div>
                                <div className="projectDescription">
                                    <p>
                                        { this.props.data.summary }
                                    </p>
                                    <hr/>
                                    <p>
                                        { this.props.data.description }
                                    </p>
                                    <hr/>
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
                            </div>
                            <div className="projectModalBottomContainer">
                                <Carousel images={ this.props.data.images.slideshow }/>
                                <div className="projectModalLinks">
                                    {
                                        this.props.data.links && this.props.data.links.map((link, index) => {
                                            return (
                                                <p>
                                                    <a className="link" href={ link.link }> { link.text } </a>
                                                </p>
                                            )
                                        })
                                    }
                                    
                                    {
                                        this.props.data.soundcloud && 
                                            <p>
                                                <a className="soundcloudLink" href={ this.props.data.soundcloud }> Check some music from SoundCloud! </a>
                                            </p>
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <a className="projectModalHeader" href="#" onClick={ this.clickHandler }>
                            &times;
                        </a>
                    </div>
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default ProjectModal
