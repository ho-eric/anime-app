import React from "react";

const AnimeCard = ({ anime: { title, score, images, year, rating } }) => {
  return (
    <div className="anime-card">
      <img src={images.jpg.large_image_url} alt={title} />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <p>⭐{score ? score.toFixed(1) : "N/A"}</p>
          </div>
          <span>|</span>
          <p className="lang">{rating ? rating : "N/A"}</p>
          <span>|</span>
          <p className="year">{year ? year : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
