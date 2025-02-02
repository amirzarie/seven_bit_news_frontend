import React from "react";
import "./ArticleTable.css";

const ArticleTable = ({ articles, currentTopic }) => {
  // Don't render anything if there are no articles
  if (!articles || articles.length === 0) {
    return null;
  }

  const getSourceLeaning = (source) => {
    const sourceLower = source.toLowerCase();
    // Left-leaning sources
    if (
      ["cnn", "msnbc", "huffington post"].some((s) => sourceLower.includes(s))
    ) {
      return "left";
    }
    // Right-leaning sources
    if (
      ["fox news", "wall street journal", "washington times"].some((s) =>
        sourceLower.includes(s)
      )
    ) {
      return "right";
    }
    // Centrist sources
    if (
      ["reuters", "associated press", "bbc"].some((s) =>
        sourceLower.includes(s)
      )
    ) {
      return "center";
    }
    return "other";
  };

  const getSourceColor = (source) => {
    const leaning = getSourceLeaning(source);
    switch (leaning) {
      case "left":
        return "left-source";
      case "right":
        return "right-source";
      case "center":
        return "center-source";
      default:
        return "";
    }
  };

  // Sort articles by political leaning and then by source alphabetically
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

  return (
    <div className="article-table-container">
      <h3
        style={{
          marginBottom: "15px",
          marginTop: "0px",
          textAlign: "center",
          color: "#000",
          fontSize: "16px",
        }}
      >
        Articles for "{currentTopic?.toUpperCase()}": {articles.length}
      </h3>
      <div className="article-table-wrapper">
        <table className="article-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Title</th>
              <th>
                <div className="sentiment-header">
                  Sentiment
                  <div className="tooltip">
                    <span className="info-icon">i</span>
                    <span className="tooltip-text">
                      <strong>Polarity (P):</strong> measures the emotional
                      sentiment of the article, ranging from -1 (negative) to +1
                      (positive)
                      <br />
                      <br />
                      <strong>Subjectivity (S):</strong> measures the degree of
                      personal opinion or factuality of the article, ranging
                      from 0 (objective) to 1 (subjective)
                    </span>
                  </div>
                </div>
              </th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.map((article, index) => (
              <tr key={index}>
                <td className={getSourceColor(article.source)}>
                  {article.source}
                </td>
                <td>{article.title}</td>
                <td>
                  <div className="sentiment-scores">
                    <span title="Polarity (-1 negative to 1 positive)">
                      P: {article.sentiment.polarity}
                    </span>
                    <br />
                    <span title="Subjectivity (0 objective to 1 subjective)">
                      S: {article.sentiment.subjectivity}
                    </span>
                  </div>
                </td>
                <td>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-link"
                  >
                    Read Article
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleTable;
