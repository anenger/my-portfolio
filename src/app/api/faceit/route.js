import { NextResponse } from "next/server";
import fetch from "node-fetch";

const FACEIT_API_KEY = process.env.FACEIT_API_KEY;
const FACEIT_NICKNAME = process.env.FACEIT_NICKNAME;
const FACEIT_API_BASE = "https://open.faceit.com/data/v4";

async function fetchWithAuth(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${FACEIT_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`FaceIT API error: ${response.status}`);
  }
  return response.json();
}

async function getRecentMatchStats(playerId, gameId) {
  try {
    const historyUrl = `${FACEIT_API_BASE}/players/${playerId}/history?game=${gameId}&limit=1`;
    const historyData = await fetchWithAuth(historyUrl);

    if (!historyData.items || historyData.items.length === 0) {
      return null;
    }

    const recentMatch = historyData.items[0];
    const matchId = recentMatch.match_id;

    const matchStatsUrl = `${FACEIT_API_BASE}/matches/${matchId}/stats`;
    const matchStats = await fetchWithAuth(matchStatsUrl);

    const rounds = matchStats.rounds?.[0];
    if (!rounds) return null;

    let playerStats = null;
    let playerTeam = null;
    let opponentTeam = null;

    for (const team of rounds.teams || []) {
      for (const player of team.players || []) {
        if (player.player_id === playerId) {
          playerStats = player.player_stats;
          playerTeam = team;
          break;
        }
      }
      if (playerStats) {
        opponentTeam = rounds.teams.find((t) => t !== playerTeam);
        break;
      }
    }

    if (!playerStats || !playerTeam) return null;

    const teamScore = parseInt(playerTeam.team_stats?.["Final Score"] || "0");
    const opponentScore = parseInt(
      opponentTeam?.team_stats?.["Final Score"] || "0"
    );
    const isWin = teamScore > opponentScore;

    return {
      isWin,
      score: `${teamScore}-${opponentScore}`,
      kd: parseFloat(playerStats["K/D Ratio"] || "0").toFixed(2),
      adr: parseFloat(playerStats.ADR || "0").toFixed(1),
    };
  } catch (error) {
    console.error("Error fetching match stats:", error);
    return null;
  }
}

export async function GET() {
  if (!FACEIT_API_KEY || !FACEIT_NICKNAME) {
    return NextResponse.json({ error: "FaceIT configuration missing" });
  }

  try {
    const playerData = await fetchWithAuth(
      `${FACEIT_API_BASE}/players?nickname=${encodeURIComponent(FACEIT_NICKNAME)}`
    );

    const cs2Data = playerData.games?.cs2;
    const csgoData = playerData.games?.csgo;

    const gameData = cs2Data || csgoData;
    const gameName = cs2Data ? "CS2" : csgoData ? "CS:GO" : null;
    const gameId = cs2Data ? "cs2" : csgoData ? "csgo" : null;

    if (!gameData) {
      return NextResponse.json({
        nickname: playerData.nickname,
        avatar: playerData.avatar,
        error: "No Counter-Strike data found",
      });
    }

    const recentMatch = await getRecentMatchStats(playerData.player_id, gameId);

    return NextResponse.json({
      nickname: playerData.nickname,
      avatar: playerData.avatar,
      faceitUrl: playerData.faceit_url?.replace("{lang}", "en"),
      game: gameName,
      skillLevel: gameData.skill_level,
      elo: gameData.faceit_elo,
      recentMatch,
    });
  } catch (error) {
    console.error("FaceIT API error:", error);
    return NextResponse.json({ error: "Something went wrong with FaceIT" });
  }
}
