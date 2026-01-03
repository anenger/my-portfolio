import fetch from "node-fetch";

const LETTERBOXD_USERNAME = process.env.LETTERBOXD_USERNAME;

// Simple XML parsing helper for RSS feeds
function extractTagContent(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function extractCDATA(content) {
  if (!content) return null;
  const cdataMatch = content.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return cdataMatch ? cdataMatch[1].trim() : content;
}

function extractImageFromDescription(description) {
  if (!description) return null;
  const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

function extractRatingFromDescription(description) {
  if (!description) return null;
  // Letterboxd uses star ratings like "★★★★" or "★★★½"
  const starsMatch = description.match(/★+½?/);
  if (starsMatch) {
    const stars = starsMatch[0];
    const fullStars = (stars.match(/★/g) || []).length;
    const halfStar = stars.includes("½") ? 0.5 : 0;
    return fullStars + halfStar;
  }
  return null;
}

function parseRSSItem(itemXml) {
  const title = extractCDATA(extractTagContent(itemXml, "title"));
  const link = extractTagContent(itemXml, "link");
  const pubDate = extractTagContent(itemXml, "pubDate");
  const description = extractCDATA(extractTagContent(itemXml, "description"));

  // Parse the title - Letterboxd format is usually "Film Title, Year"
  let filmTitle = title;
  let year = null;
  const titleMatch = title?.match(/^(.+),\s*(\d{4})$/);
  if (titleMatch) {
    filmTitle = titleMatch[1].trim();
    year = titleMatch[2];
  }

  return {
    title: filmTitle,
    year,
    link,
    pubDate,
    posterUrl: extractImageFromDescription(description),
    rating: extractRatingFromDescription(description),
  };
}

export default async function handler(req, res) {
  if (!LETTERBOXD_USERNAME) {
    return res.json({ error: "Letterboxd username not configured" });
  }

  try {
    const rssUrl = `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`;

    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    // Find all items in the RSS feed
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g);

    if (!itemMatches || itemMatches.length === 0) {
      return res.json({ error: "No films found" });
    }

    // Get the most recent film (first item)
    const recentFilm = parseRSSItem(itemMatches[0]);

    res.json({
      title: recentFilm.title,
      year: recentFilm.year,
      posterUrl: recentFilm.posterUrl,
      rating: recentFilm.rating,
      link: recentFilm.link,
      watchedDate: recentFilm.pubDate,
      profileUrl: `https://letterboxd.com/${LETTERBOXD_USERNAME}/`,
    });
  } catch (error) {
    console.error("Letterboxd RSS error:", error);
    res.json({ error: "Something went wrong with Letterboxd" });
  }
}
