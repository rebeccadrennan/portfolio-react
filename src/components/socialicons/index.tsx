import React from "react";
import "./style.css";
import {
  FaGithub,
  FaFacebookF,
  FaLinkedin,
  FaCodepen,
  FaCircle,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { socialprofils } from "../../content_option";

const ICON_MAPPING: Record<string, IconType> = {
  default: FaCircle,
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedin,
  codepen: FaCodepen,
};

export const Socialicons = () => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;

          return (
            <li key={platform}>
              <a
                href={url}
                aria-label={platform}
                target="_blank"
                rel="noreferrer"
              >
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};
