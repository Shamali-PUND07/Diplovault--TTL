index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read More
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = {
  Polity: ["government", "constitution", "parliament", "election"],
  Economy: ["GDP", "inflation", "stock market", "RBI"],
  Environment: ["climate change", "pollution", "wildlife", "forest"],
  Science: ["ISRO", "NASA", "quantum", "AI"],
  International: ["UN", "diplomacy", "foreign policy", "G20"],
};

const categorizeNews = (articles) => {
  const categorized = {};
  Object.keys(categories).forEach((category) => {
    categorized[category] = articles.filter((article) =>
      categories[category].some((keyword) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  });
  return categorized;
};

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dfe41fd4259421fabf18e0e87f5c20e`
    )
      .then((response) => response.json())
      .then((data) => {
        const categorizedNews = categorizeNews(data.articles);
        setNews(categorizedNews);
        setFilteredNews(data.articles);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredNews(Object.values(news).flat());
    } else {
      setFilteredNews(news[category] || []);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-4">UPSC Daily News</h1>
      <div className="flex gap-2 justify-center mb-4">
        <Button onClick={() => handleCategoryClick("All")} variant="outline">All</Button>
        {Object.keys(categories).map((category) => (
          <Button key={category} onClick={() => handleCategoryClick(category)} variant="outline">
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNews.map((article, 
  );
};

export default NewsPage;
