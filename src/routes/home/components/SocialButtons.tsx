import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";

library.add(faTwitter, faLinkedin, faGithub);

export const SocialButtons = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "auto" }}>
        <ul>
          <li>
            <a
              href="https://twitter.com/sudothei"
              target="blank"
              style={{ padding: "0.5em" }}
            >
              {" "}
              <FontAwesomeIcon icon={faTwitter} size="lg" /> Twitter{" "}
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/paigevenuto"
              target="blank"
              style={{ padding: "0.5em" }}
            >
              {" "}
              <FontAwesomeIcon icon={faLinkedin} size="lg" /> LinkedIn{" "}
            </a>
          </li>
          <li>
            <a
              href="https://github.com/sudothei"
              target="blank"
              style={{ padding: "0.5em" }}
            >
              {" "}
              <FontAwesomeIcon icon={faGithub} size="lg" /> GitHub{" "}
            </a>
          </li>
          <li>
            <a
              href="https://mstdn.sudothei.io"
              target="blank"
              style={{ padding: "0.5em" }}
            >
              {" "}
              <FontAwesomeIcon icon={faMastodon} size="lg" /> Mastodon{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
