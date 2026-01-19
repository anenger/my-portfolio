import { NextResponse } from "next/server";
import fetch from "node-fetch";

const GOODREADS_USER_ID = process.env.GOODREADS_USER_ID;
const GOODREADS_SHELF = process.env.GOODREADS_SHELF;

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
  let cleaned = extractCDATA(url);
  cleaned = cleaned?.trim();
  if (!cleaned || cleaned === "" || cleaned.includes("nophoto")) {
    return null;
  }
  return cleaned;
}

function parseRSSItem(itemXml) {
  const title = extractCDATA(extractTagContent(itemXml, "title"));
  const description = extractCDATA(extractTagContent(itemXml, "description"));

  const authorName = extractCDATA(extractTagContent(itemXml, "author_name"));

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
    coverUrl = extractImageFromDescription(description);
  }

  const userRating = extractTagContent(itemXml, "user_rating");

  return {
    title,
    author: authorName,
    coverUrl,
    rating: userRating && userRating !== "0" ? parseInt(userRating, 10) : null,
  };
}

export async function GET() {
  if (!GOODREADS_USER_ID) {
    return NextResponse.json({ error: "Goodreads user ID not configured" });
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
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g);

    if (!itemMatches || itemMatches.length === 0) {
      return NextResponse.json({
        error: `No books found on "${GOODREADS_SHELF}" shelf`,
      });
    }

    const recentBook = parseRSSItem(itemMatches[0]);

    return NextResponse.json({
      title: recentBook.title,
      author: recentBook.author,
      coverUrl: recentBook.coverUrl,
      rating: recentBook.rating,
      shelf: GOODREADS_SHELF,
      profileUrl: `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}`,
    });
  } catch (error) {
    console.error("Goodreads RSS error:", error);
    return NextResponse.json({ error: "Something went wrong with Goodreads" });
  }
}
