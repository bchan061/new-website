import React from 'react'

import Project from './Project'
import ProjectModal from './ProjectModal'

class ProjectContainer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            projectModalData: null
        }
        
        this.allProjects = [...this.props.projects]

        this.releasedProjects = this.allProjects.filter(
            (project) => { return project.released }
        )

        this.otherProjects = this.allProjects.filter(
            (project) => { return !project.released }
        )

        this.sortProjectArray(this.releasedProjects)
        this.sortProjectArray(this.otherProjects)
        
        this.showProjectModal = this.showProjectModal.bind(this)
        this.closeProjectModal = this.closeProjectModal.bind(this)
    }

    sortProjectArray(arr) {
        // Alphabetical and reverse year (so more recent projects come up)
        arr.sort(
            (a, b) => {
                return a.title.localeCompare(b.title) + (b.start - a.start) * 100
            }
        )
    }
    
    showProjectModal(data) {
        this.setState((state, props) => {
            return {
                projectModalData: data
            }
        })
    }
    
    closeProjectModal() {
        this.setState((state, props) => {
            return {
                projectModalData: null
            }
        })
    }

    render() {
        return (
            <div id="projects">
                <ProjectModal data={ this.state.projectModalData } onExit={ this.closeProjectModal }/> 
                
                <h1 className="largeTitle centeredText">
                    Projects
                </h1>
                <div className="releasedProjectsContainer">
                    <h1 className="subtitle extrabold">
                        Released Projects
                    </h1>
                    <h2 className="titleDescription">
                        These projects were individually marketed and released to the public.
                    </h2>
                    <h3>
                        Click on a project to see more notes, links, and images!
                    </h3>
                    <div className="projectsContainer">
                        
                        {
                            this.releasedProjects && this.releasedProjects.map((project, index) => {
                                return (
                                    <Project data={project} onClick={ this.showProjectModal } key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="otherProjectsContainer">
                    <h1 className="subtitle extrabold">
                        Other Projects
                    </h1>
                    <h2 className="titleDescription">
                      These more personal projects were made for learning new tools. 
                    </h2>
                    <div className="projectsContainer">
                        
                        {
                            this.otherProjects && this.otherProjects.map((project, index) => {
                                return (
                                    <Project data={project} onClick={ this.showProjectModal } key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectContainer
