import React from 'react'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            current: 0
        }
        
        this.previousSlide = this.previousSlide.bind(this)
        this.nextSlide = this.nextSlide.bind(this)
        this.getArrowStyle = this.getArrowStyle.bind(this)
    }
    
    previousSlide(e) {
        e.preventDefault()
        if (this.props.images.length > 0) {
            this.setState((previousState, props) => ({
                current: (previousState.current + props.images.length - 1) % props.images.length
            }))
        }
    }
    
    nextSlide(e) {
        e.preventDefault()
        if (this.props.images.length > 0) {
            this.setState((previousState, props) => ({
                current: (previousState.current + 1) % props.images.length
            }))
        }
    }
    
    getArrowStyle(left) {
        let index = this.state.current
        let classNames = "carouselArrow "
        if (left) {
            classNames += "carouselLeft "
        } else {
            classNames += "carouselRight "
        }
        
        if (
            (left && index === 0) ||
            (!left && index === this.props.images.length - 1)
        ) {
            classNames += "carouselArrowInactive "
        }
        
        return classNames
    }
    
    render() {
        if (this.props.images === null || this.props.images.length === 0) {
            return ( null )
        }
        
        return (
            <div className="carouselContainer">
                <a className={ this.getArrowStyle(true) } href="#" onClick={ this.previousSlide }> &#10094; </a>
                {
                    this.props.images && this.props.images.map((image, index) => {
                        if (this.state.current === index) {
                            return (
                                <img className="carouselImage" src={ "./images/" + image } key={ index } />
                            )
                        } else {
                            return (
                                null
                            )
                        }
                    })
                }
                <a className={ this.getArrowStyle(false) } href="#" onClick={ this.nextSlide }> &#10095; </a>
            </div>
        )
    }
}

export default Carousel
