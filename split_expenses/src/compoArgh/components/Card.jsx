import React from "react";
import './card.css'
const Card = ({ title, content }) => {
  return (
    <div className="main1">
    <div className="card">
      <div className="title">
        <h2>{title}</h2>
      </div>  
      <div className="content">
        <p>{content}</p>
      </div>
    </div>
    </div>
  );
};

export default Card;