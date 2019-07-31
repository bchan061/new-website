import React from 'react'

class Intro extends React.Component {
    constructor(props) {
        super(props)

        this.links = [
            {
                name: 'GitHub',
                link: 'https://github.com/bchan061'
            },
            {
                name: 'Resume',
                link: 'other/ResumeCA.pdf'
            }
        ]
    }

    render() {
        return (
            <div id="intro">
                <img
                    src="./images/profile.jpg"
                    alt="Profile Picture"
                    className="profilePicture centered"
                />

                <h2 className="profileName"> Brandon Chan </h2>
                
                <p className="links">
                {
                    this.links.map((link, index) => {
                        let divider = ''
                        if (index < this.links.length - 1) {
                            divider = ' • '
                        }
                        return (
                            <span>
                                <a href={ link.link } key={ index }>{ link.name }</a>
                                { divider }
                            </span>
                        )
                    })
                }
                </p>
            </div>
        )
    }
}

export default Intro
