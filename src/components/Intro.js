import React from 'react'

class Intro extends React.Component {
    constructor(props) {
        super(props)

        this.links = [
            {
                name: 'GitHub',
                image: 'logos/github.png',
                link: 'https://github.com/bchan061'
            },
            {
                name: 'LinkedIn',
                image: 'logos/linkedin.png',
                link: 'https://www.linkedin.com/in/brandon-chan-521a42177/'
            },
            {
                name: 'Resume',
                link: 'other/ResumeCA.pdf'
            }
        ]

        this.linksAndDivider = []
        for (let link of this.links) {
            this.linksAndDivider.push(link)
            this.linksAndDivider.push({divider: true})
        }

        // Remove the last link
        this.linksAndDivider.splice(this.linksAndDivider.length - 1, 1)
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
                
                <span className="links">
                {
                    this.linksAndDivider.map((object, index) => {
                        if (object.divider) {
                            return (
                                <span> • </span>
                            )
                        }
                        let link = object
                        return (
                            <a href={ link.link } key={ index } className="profileLink">
                                {
                                    link.image && <img src={link.image} alt={link.name} className="logo">

                                    </img>
                                }
                                {
                                    !link.image && link.name
                                }
                            </a>
                        )
                    })
                }
                </span>
            </div>
        )
    }
}

export default Intro
