import React from 'react';
import '../styles/NewsCard.css';

export default function NewsCard({ news }) {
  return (
    <div className="news-card">
      {news.description != "[Removed]" ? (
        <>
        <img src={news.urlToImage} alt={news.title} />
      <div className="news-card-body">
        <h2 className="news-card-title">{news.title}</h2>
        <p className="news-card-description">{news.description}</p>
      </div>
      <div className="news-card-footer">
        <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
        <span className="news-card-author">By {news.author}</span>
      </div>
        </>
      ):(
        <div className="news-card-body">
          <h2 className="news-card-title">News is Removed by the author</h2>
        </div>
      )
      }
      
    </div>
  );
}
