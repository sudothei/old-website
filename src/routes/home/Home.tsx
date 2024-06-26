import * as React from "react";
import { SocialButtons } from "components/SocialButtons";
import { AnimatedPfp } from "components/AnimatedPfp";
import { LoadingBar } from "components/LoadingBar";

// Metadata for SEO
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <div className="container">
      {/* Primary heading - include your full name or brand name */}
      <h1>sudothei - Web Developer & Programmer</h1>

      {/* Personal introduction or tagline */}
      <p>
        Hello! I'm sudothei, a versatile web developer and programmer ready to
        tackle your tech challenges.
      </p>

      {/* Profile picture with animation */}
      <div className="ui-box">
        <AnimatedPfp />
      </div>

      {/* Social media buttons */}
      <div className="ui-box">
        <SocialButtons />
      </div>

      {/* Contact information */}
      <div className="ui-box">
        <h2>Contact Me</h2>
        <p>
          Email:{" "}
          <a href="mailto:your-email@example.com">your-email@example.com</a>
        </p>
        <p>Phone: (123) 456-7890</p>
      </div>

      {/* Skills section */}
      <div className="ui-box">
        <h2>Skills</h2>
        <ul>
          <li>JavaScript, React, Node.js</li>
          <li>HTML, CSS, SASS</li>
          <li>Python, Django</li>
          <li>Database Management (SQL, MongoDB)</li>
          <li>Version Control (Git, GitHub)</li>
        </ul>
      </div>

      {/* Portfolio section */}
      <div className="ui-box">
        <h2>Portfolio</h2>
        <p>Check out some of my recent projects:</p>
        <ul>
          <li>
            <a href="https://project1.example.com">Project 1</a>
          </li>
          <li>
            <a href="https://project2.example.com">Project 2</a>
          </li>
          <li>
            <a href="https://project3.example.com">Project 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="App">
      {/* Loading bar component */}
      <LoadingBar />

      {/* SEO metadata */}
      <Helmet>
        <title>sudothei - Freelance Web Developer & Programmer</title>
        <meta
          name="description"
          content="sudothei is a freelance web developer and programmer specializing in web development, programming, and tech solutions. Contact for your next project."
        />
        <meta
          name="keywords"
          content="web developer, programmer, freelance, JavaScript, React, Node.js, HTML, CSS, Python, Django"
        />
      </Helmet>

      {/* Main content */}
      <App />
    </div>
  );
};
