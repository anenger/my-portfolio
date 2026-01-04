import fetch from "node-fetch";

const GOODREADS_USER_ID = process.env.GOODREADS_USER_ID;
const GOODREADS_SHELF = process.env.GOODREADS_SHELF;

// Simple XML parsing helpers for RSS feeds
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

function cleanUrl(url) {
  if (!url) return null;
  // Remove CDATA wrapper if present
  let cleaned = extractCDATA(url);
  // Trim whitespace
  cleaned = cleaned?.trim();
  // Return null for empty or placeholder URLs
  if (!cleaned || cleaned === "" || cleaned.includes("nophoto")) {
    return null;
  }
  return cleaned;
}

function parseRSSItem(itemXml) {
  const title = extractCDATA(extractTagContent(itemXml, "title"));
  const description = extractCDATA(extractTagContent(itemXml, "description"));

  // Extract author from author_name tag if present
  const authorName = extractCDATA(extractTagContent(itemXml, "author_name"));

  // Extract book image - try multiple sources
  // Goodreads RSS uses book_large_image_url, book_medium_image_url, book_small_image_url, book_image_url
  let coverUrl = cleanUrl(extractTagContent(itemXml, "book_large_image_url"));
  if (!coverUrl) {
    coverUrl = cleanUrl(extractTagContent(itemXml, "book_medium_image_url"));
  }
  if (!coverUrl) {
    coverUrl = cleanUrl(extractTagContent(itemXml, "book_image_url"));
  }
  if (!coverUrl) {
    coverUrl = cleanUrl(extractTagContent(itemXml, "book_small_image_url"));
  }
  if (!coverUrl) {
    // Try to extract from description HTML as fallback
    coverUrl = extractImageFromDescription(description);
  }

  // Extract rating if user has rated
  const userRating = extractTagContent(itemXml, "user_rating");

  return {
    title,
    author: authorName,
    coverUrl,
    rating: userRating && userRating !== "0" ? parseInt(userRating, 10) : null,
  };
}

export default async function handler(req, res) {
  if (!GOODREADS_USER_ID) {
    return res.json({ error: "Goodreads user ID not configured" });
  }

  try {
    const rssUrl = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${GOODREADS_SHELF}`;

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
      return res.json({
        error: `No books found on "${GOODREADS_SHELF}" shelf`,
      });
    }

    // Get the most recent book (first item)
    const recentBook = parseRSSItem(itemMatches[0]);

    res.json({
      title: recentBook.title,
      author: recentBook.author,
      coverUrl: recentBook.coverUrl,
      rating: recentBook.rating,
      shelf: GOODREADS_SHELF,
      profileUrl: `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}`,
    });
  } catch (error) {
    console.error("Goodreads RSS error:", error);
    res.json({ error: "Something went wrong with Goodreads" });
  }
}
