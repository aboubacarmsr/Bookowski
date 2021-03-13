import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
// import PropTypes from 'prop-types'

const Rating = ({ rating, color }) => {
    return (
        <div className="rating-stars">
            <span style={{ color }}>
                { rating >= 1 ? <FontAwesomeIcon icon={faStar} /> : 
                    rating >= 0.5 ? <FontAwesomeIcon icon={faStarHalfAlt} />
                        : <FontAwesomeIcon icon={faStarEmpty} /> }
            </span>
            <span style={{ color }}>
                { rating >= 2 ? <FontAwesomeIcon icon={faStar} /> : 
                    rating >= 1.5 ? <FontAwesomeIcon icon={faStarHalfAlt} />
                        : <FontAwesomeIcon icon={faStarEmpty} /> }
            </span>
            <span style={{ color }}>
                { rating >= 3 ? <FontAwesomeIcon icon={faStar} /> : 
                    rating >= 2.5 ? <FontAwesomeIcon icon={faStarHalfAlt} />
                        : <FontAwesomeIcon icon={faStarEmpty} /> }
            </span>
            <span style={{ color }}>
                { rating >= 4 ? <FontAwesomeIcon icon={faStar} /> : 
                    rating >= 3.5 ? <FontAwesomeIcon icon={faStarHalfAlt} />
                        : <FontAwesomeIcon icon={faStarEmpty} /> }
            </span>
            <span style={{ color }}>
                { rating >= 5 ? <FontAwesomeIcon icon={faStar} /> : 
                    rating >= 4.5 ? <FontAwesomeIcon icon={faStarHalfAlt} />
                        : <FontAwesomeIcon icon={faStarEmpty} /> }
            </span>
            <span> {rating} </span>
        </div>
    )
}

//Sans passer une valeur au composant mère on attribue une valeur par défaut au props color
Rating.defaultProps = {
    color: '#F78600',
}

//Permet de vérifier que la valeur passée en props correspond au type (pas indispensable)
// Rating.propTypes = {
//     rating: PropTypes.number.isRequired,
//     color: PropTypes.string
// }

export default Rating
