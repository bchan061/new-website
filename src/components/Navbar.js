import React from 'react'

class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.links = [
            ["Home", ""],
            ["Projects", "projects"],
            ["Courses", "courses"]
        ]
    }

    render() {
        return (
            <div className="navbarContainer">
                <span className="name">
                    <a href="#" class="name noUnderline">
                        Brandon Chan
                    </a>
                </span>
                <span className="navbar">
                    {
                        this.links && this.links.map((link, index) => {
                            return (
                                <a className="navbarItem" key={index} href={ "#" + link[1] }>
                                    { link[0] }
                                </a>
                            )
                        })
                    }
                </span>
            </div>
        )
    }
}

export default Navbar
