import React from "react";
import "./style.css";
import { FaGithub, FaFacebookF, FaLinkedin, FaCodepen, FaCircle } from "react-icons/fa";
import type { IconType } from "react-icons";
import { socialprofils } from "../../content_option";

const DEFAULT_ICON: IconType = FaCircle;
type SupportedPlatform = keyof typeof socialprofils | "facebook";

const ICON_MAPPING: Partial<Record<SupportedPlatform, IconType>> = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedin,
  codepen: FaCodepen,
};

export const Socialicons = () => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {(Object.entries(socialprofils) as Array<[keyof typeof socialprofils, string]>).map(
          ([platform, url]) => {
            const IconComponent = ICON_MAPPING[platform] ?? DEFAULT_ICON;

            return (
              <li key={platform}>
                <a href={url} aria-label={platform} target="_blank" rel="noreferrer">
                  <IconComponent />
                </a>
              </li>
            );
          }
        )}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};
