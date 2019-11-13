import React from 'react'

import { Container, Navbar, Nav } from 'react-bootstrap'

class WebsiteNavbar extends React.Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" variant="light" expand="lg" fixed="top">
                    <Navbar.Brand href="#home">Brandon Chan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#courses">Coursework</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default WebsiteNavbar
