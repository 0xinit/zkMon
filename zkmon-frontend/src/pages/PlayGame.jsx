import React, { useState, useEffect } from "react";

function HTMLRenderer() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtmlFile = async () => {
      try {
        const response = await fetch("./game.html");
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error("Error fetching HTML file:", error);
      }
    };

    fetchHtmlFile();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default HTMLRenderer;
