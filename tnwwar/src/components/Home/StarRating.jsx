import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFilled, faStarHalfAlt, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const remainingStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars;

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStarFilled} className="star filled" />
            ))}
            {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="star half" />}
            {[...Array(remainingStars)].map((_, index) => (
                <FontAwesomeIcon key={index + fullStars} icon={faStarEmpty} className="star empty" />
            ))}
        </div>
    );
};

export default StarRating;
