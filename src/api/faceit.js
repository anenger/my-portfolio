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
    // Get match history
    const historyUrl = `${FACEIT_API_BASE}/players/${playerId}/history?game=${gameId}&limit=1`;
    const historyData = await fetchWithAuth(historyUrl);

    if (!historyData.items || historyData.items.length === 0) {
      return null;
    }

    const recentMatch = historyData.items[0];
    const matchId = recentMatch.match_id;

    // Get detailed match stats
    const matchStatsUrl = `${FACEIT_API_BASE}/matches/${matchId}/stats`;
    const matchStats = await fetchWithAuth(matchStatsUrl);

    // Find the player's team and stats
    const rounds = matchStats.rounds?.[0];
    if (!rounds) return null;

    // Find which team the player was on and their individual stats
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
      matchId,
      isWin,
      score: `${teamScore}-${opponentScore}`,
      map: rounds.round_stats?.Map || recentMatch.competition_name,
      kills: parseInt(playerStats.Kills || "0"),
      deaths: parseInt(playerStats.Deaths || "0"),
      assists: parseInt(playerStats.Assists || "0"),
      kd: parseFloat(playerStats["K/D Ratio"] || "0").toFixed(2),
      adr: parseFloat(playerStats.ADR || "0").toFixed(1),
      headshots: playerStats["Headshots %"],
    };
  } catch (error) {
    console.error("Error fetching match stats:", error);
    return null;
  }
}

export default async function handler(req, res) {
  if (!FACEIT_API_KEY || !FACEIT_NICKNAME) {
    return res.json({ error: "FaceIT configuration missing" });
  }

  try {
    // First, get player info by nickname
    const playerData = await fetchWithAuth(
      `${FACEIT_API_BASE}/players?nickname=${encodeURIComponent(FACEIT_NICKNAME)}`
    );

    // Extract CS2 specific data (game_id for CS2 is "cs2")
    const cs2Data = playerData.games?.cs2;
    const csgoData = playerData.games?.csgo;

    // Prefer CS2, fallback to CSGO
    const gameData = cs2Data || csgoData;
    const gameName = cs2Data ? "CS2" : csgoData ? "CS:GO" : null;
    const gameId = cs2Data ? "cs2" : csgoData ? "csgo" : null;

    if (!gameData) {
      return res.json({
        nickname: playerData.nickname,
        avatar: playerData.avatar,
        country: playerData.country,
        error: "No Counter-Strike data found",
      });
    }

    // Get recent match stats
    const recentMatch = await getRecentMatchStats(playerData.player_id, gameId);

    res.json({
      nickname: playerData.nickname,
      avatar: playerData.avatar,
      country: playerData.country,
      faceitUrl: playerData.faceit_url?.replace("{lang}", "en"),
      game: gameName,
      skillLevel: gameData.skill_level,
      elo: gameData.faceit_elo,
      region: gameData.region,
      recentMatch,
    });
  } catch (error) {
    console.error("FaceIT API error:", error);
    res.json({ error: "Something went wrong with FaceIT" });
  }
}

