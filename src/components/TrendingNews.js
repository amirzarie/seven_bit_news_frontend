import React from "react";
import "./TrendingNews.css";

const TrendingNews = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const getSourceLeaning = (source) => {
    const sourceLower = source.toLowerCase();
    // Left-leaning sources
    if (
      ["cnn", "msnbc", "the-huffington-post", "huffington post"].some((s) =>
        sourceLower.includes(s)
      )
    ) {
      return "left";
    }
    // Centrist sources
    if (
      [
        "reuters",
        "associated-press",
        "associated press",
        "ap",
        "bbc-news",
        "bbc"
      ].some((s) => sourceLower.includes(s)
      )
    ) {
      return "center";
    }
    // Right-leaning sources
    if (
      [
        "fox-news",
        "fox news",
        "the-wall-street-journal",
        "wall street journal",
        "the-washington-times",
        "washington times"
      ].some((s) => sourceLower.includes(s)
      )
    ) {
      return "right";
    }
    return "other";
  };

  // Sort articles by political leaning and then by source name
  const sortedArticles = [...articles].sort((a, b) => {
    const leaningOrder = { left: 1, center: 2, right: 3, other: 4 };
    const leaningA = getSourceLeaning(a.source);
    const leaningB = getSourceLeaning(b.source);

    // First sort by political leaning
    if (leaningA !== leaningB) {
      return leaningOrder[leaningA] - leaningOrder[leaningB];
    }

    // If same leaning, sort alphabetically by source
    return a.source.localeCompare(b.source);
  });

  const getSourceColor = (source) => {
    const leaning = getSourceLeaning(source);
    switch (leaning) {
      case "left":
        return "left-source";   // Blue
      case "center":
        return "center-source"; // Green
      case "right":
        return "right-source";  // Red
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="trending-container">
      <h2 className="trending-title">Trending News</h2>
      <div className="trending-grid">
        {sortedArticles.map((article, index) => (
          <div key={index} className="trending-card">
            <div className="card-header">
              <span className={`source ${getSourceColor(article.source)}`}>
                {article.source}
              </span>
              <span className="date">{formatDate(article.published_at)}</span>
            </div>
            <h3 className="article-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            <p className="description">{article.description}</p>
            <div className="sentiment-info">
              <div className="sentiment-item">
                <span className="label">Polarity:</span>
                <div className="sentiment-bar">
                  <div
                    className="sentiment-fill polarity"
                    style={{
                      width: `${((article.sentiment.polarity + 1) / 2) * 100}%`,
                      backgroundColor:
                        article.sentiment.polarity >= 0 ? "#28a745" : "#dc3545",
                    }}
                  />
                </div>
                <span className="value">{article.sentiment.polarity}</span>
              </div>
              <div className="sentiment-item">
                <span className="label">Subjectivity:</span>
                <div className="sentiment-bar">
                  <div
                    className="sentiment-fill subjectivity"
                    style={{
                      width: `${article.sentiment.subjectivity * 100}%`,
                      backgroundColor: "#ff8c00",
                    }}
                  />
                </div>
                <span className="value">{article.sentiment.subjectivity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
