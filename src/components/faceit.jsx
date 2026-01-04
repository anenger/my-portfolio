import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  faceitContainer,
  faceitCard,
  faceitHeader,
  faceitBadge,
  avatarContainer,
  avatarImage,
  skillLevelBadge,
  eloDisplay,
  eloValue,
  eloLabel,
  playerInfo,
  playerName,
  gameTag,
  recentMatchSection,
  matchResult,
  matchWin,
  matchLoss,
  matchScore,
  matchStats,
  statItem,
  statValue,
  statLabel,
  loadingState,
  errorState,
} from "./faceit.module.css";

// FaceIT skill level colors (1-10)
const SKILL_COLORS = {
  1: "#808080", // Grey
  2: "#4CAF50", // Green
  3: "#4CAF50", // Green
  4: "#FFD700", // Yellow
  5: "#FFD700", // Yellow
  6: "#FFD700", // Yellow
  7: "#FFD700", // Yellow
  8: "#FF9800", // Orange
  9: "#FF9800", // Orange
  10: "#EE4B2B", // Red
};

export const Faceit = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["faceit"],
    queryFn: () => fetch("/api/faceit").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className={faceitContainer}>
        <div className={`${faceitCard} ${loadingState}`}>
          <p>Loading FaceIT...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={faceitContainer}>
        <div className={`${faceitCard} ${errorState}`}>
          <p>{error || "Could not load FaceIT data"}</p>
        </div>
      </div>
    );
  }

  const {
    nickname,
    skillLevel: level,
    elo,
    game,
    faceitUrl,
    avatar,
    recentMatch,
  } = data;
  const skillColor = SKILL_COLORS[level] || "#666";

  return (
    <div className={faceitContainer}>
      <a
        href={faceitUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={faceitCard}
      >
        <div className={faceitHeader}>
          <span className={faceitBadge}>FaceIT</span>
          {game && <span className={gameTag}>{game}</span>}
        </div>

        <div className={avatarContainer}>
          {avatar && (
            <img
              className={avatarImage}
              src={avatar}
              alt={`${nickname}'s avatar`}
            />
          )}
          <div
            className={skillLevelBadge}
            style={{
              backgroundColor: skillColor,
              boxShadow: `0 0 12px ${skillColor}80`,
            }}
          >
            {level}
          </div>
        </div>

        <div className={eloDisplay}>
          <span className={eloValue}>{elo?.toLocaleString()}</span>
          <span className={eloLabel}>ELO</span>
        </div>

        <div className={playerInfo}>
          <span className={playerName}>{nickname}</span>
        </div>

        {recentMatch && (
          <div className={recentMatchSection}>
            <div className={matchResult}>
              <span className={recentMatch.isWin ? matchWin : matchLoss}>
                {recentMatch.isWin ? "W" : "L"}
              </span>
              <span className={matchScore}>{recentMatch.score}</span>
            </div>
            <div className={matchStats}>
              <div className={statItem}>
                <span className={statValue}>{recentMatch.kd}</span>
                <span className={statLabel}>K/D</span>
              </div>
              <div className={statItem}>
                <span className={statValue}>{recentMatch.adr}</span>
                <span className={statLabel}>ADR</span>
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};
