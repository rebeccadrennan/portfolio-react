import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FaLaptop, FaMouse, FaDesktop, FaRobot, FaComments } from "react-icons/fa";
import { SiDocker, SiSpotify, SiVisualstudiocode } from "react-icons/si";
import type { IconType } from "react-icons";
import "./style.css";

type DeskItem = {
  id: string;
  label: string;
  detail: string;
  icon: IconType;
  accent: string;
};

const deskItems: DeskItem[] = [
  {
    id: "laptop",
    label: "ASUS dual screen laptop",
    detail: "Love being able to extend out 2 monitors anywhere.",
    icon: FaLaptop,
    accent: "#f6b26b",
  },
  {
    id: "mouse",
    label: "Mouse: Rapoo v4",
    detail: "Simple, reliable, and easy on long work sessions.",
    icon: FaMouse,
    accent: "#8bd3dd",
  },
  {
    id: "monitors",
    label: "Double monitors with arms",
    detail: "The setup that keeps the whole desk feeling spacious.",
    icon: FaDesktop,
    accent: "#f9c74f",
  },
  {
    id: "vscode",
    label: "VS Code",
    detail: "Where most ideas turn into something real.",
    icon: SiVisualstudiocode,
    accent: "#4fc3f7",
  },
  {
    id: "copilot",
    label: "Copilot",
    detail: "Multi agents and use ask when I want a sharper second brain.",
    icon: FaRobot,
    accent: "#b8c0ff",
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    detail: "Love projects, brainstorming, and turning rough thoughts into plans.",
    icon: FaComments,
    accent: "#89f0c5",
  },
  {
    id: "docker",
    label: "Docker",
    detail: "Keeps local environments predictable and portable.",
    icon: SiDocker,
    accent: "#70d6ff",
  },
  {
    id: "spotify",
    label: "Spotify",
    detail: "Must need for focus, momentum, and background energy.",
    icon: SiSpotify,
    accent: "#7cdf64",
  },
];

const defaultDeskItem = deskItems[3] as DeskItem;

export const DeskSetupSection = () => {
  const [activeItem, setActiveItem] = useState<DeskItem>(defaultDeskItem);

  const ActiveIcon = activeItem.icon;

  return (
    <Container>
      <section id="desk-setup" className="desk-setup sec_sp reveal-section">
        <div className="section-heading desk-setup-heading">
          <p className="about-eyebrow">My Desk</p>
          <h2>A setup that can move, multitask, and keep the music flowing.</h2>
          <p>
            This is the gear stack that sits behind the projects, the late-night debugging, and the
            occasional chat with Copilot or ChatGPT when I want a better angle on the problem.
          </p>
        </div>

        <div className="desk-layout">
          <div className="desk-stage" aria-label="Interactive desk setup preview">
            <div className="desk-room-light" aria-hidden="true" />
            <div className="desk-lamp" aria-hidden="true" />

            <div className="desk-monitor-shelf">
              <div className="desk-monitor-card desk-monitor-card-left">2 external displays</div>
              <div className="desk-monitor-card desk-monitor-card-right">Articulating arms</div>
            </div>

            <div className="desk-laptop-shell">
              <div className="desk-screen">
                <div className="desk-screen-topbar">
                  <span>{activeItem.label}</span>
                  <span className="desk-screen-badge">Active</span>
                </div>

                <div className="desk-screen-content">
                  <ActiveIcon className="desk-screen-icon" aria-hidden="true" />
                  <h3>{activeItem.label}</h3>
                  <p>{activeItem.detail}</p>
                </div>
              </div>

              <div className="desk-base" aria-hidden="true" />
            </div>

            <div className="desk-peripheral desk-mouse" aria-hidden="true">
              Rapoo v4
            </div>
            <div className="desk-peripheral desk-spotify" aria-hidden="true">
              Spotify on
            </div>
          </div>

          <div className="desk-details">
            <div className="desk-details-card">
              <p className="desk-details-kicker">Tap to highlight a piece of the desk</p>
              <div className="desk-details-summary">
                <span
                  className="desk-details-accent"
                  style={{ backgroundColor: activeItem.accent }}
                  aria-hidden="true"
                />
                <div>
                  <h3>{activeItem.label}</h3>
                  <p>{activeItem.detail}</p>
                </div>
              </div>
            </div>

            <div className="desk-chip-grid" role="list" aria-label="Desk setup items">
              {deskItems.map((item) => {
                const ItemIcon = item.icon;
                const isActive = item.id === activeItem.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`desk-chip ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveItem(item)}
                    onFocus={() => setActiveItem(item)}
                    onClick={() => setActiveItem(item)}
                    style={{ ["--desk-chip-accent" as string]: item.accent }}
                    aria-pressed={isActive}
                    aria-label={item.label}
                    role="listitem"
                  >
                    <ItemIcon className="desk-chip-icon" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
