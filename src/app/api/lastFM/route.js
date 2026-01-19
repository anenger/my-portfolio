import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json({ error: "Last.fm configuration missing" });
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong with Last.fm");
    }

    const result = await response.json();
    result.profileUrl = `https://www.last.fm/user/${username}`;

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: "Whoops! Something went wrong with Last.fm",
    });
  }
}
