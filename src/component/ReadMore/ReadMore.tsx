import React, { useState } from "react";
import './ReadMore.scss';

const ReadMore: React.FC<{children: string}> = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="read_or_hide">
        {isReadMore ? " read more" : " show less"}
      </span>
        </p>
    );
};

export default ReadMore;
