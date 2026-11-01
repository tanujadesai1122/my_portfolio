
import React, { useEffect, useState } from "react";

import {
  Mail,
  Download,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  Code2,
  Database,
  Cpu,
  Globe,
  ArrowUpRight,
  Briefcase
} from "lucide-react";

import "./styles.css";

// Personal details
const GITHUB_USERNAME = "tanujadesai1122";
const CONTACT_EMAIL = "tanujadesai2006@gmail.com";

// Portfolio projects
const projects = [
  {
    title: "Microplastic Detection System",
    category: "AI / Machine Learning",
    description:
      "An AI-powered visual screening system using YOLOv8 to identify suspected microplastic particles in microscopic water-sample images.",
    technologies: [
      "React",
      "Node.js",
      "Python",
      "Flask",
      "YOLOv8",
      "SQLite"
    ],
    github:
      "https://github.com/tanujadesai1122/microplastic_detection",
    demo: ""
  },

  {
    title: "Pipeline Leakage Detection System",
    category: "IoT / Embedded Systems",
    description:
      "An IoT-based pipeline monitoring system using ESP32 and flow sensors to compare water flow and identify possible leakage.",
    technologies: [
      "ESP32",
      "Arduino",
      "C++",
      "Flow Sensors",
      "Web Dashboard"
    ],
    github: "",
    demo: ""
  },

  {
    title: "Law Assist",
    category: "AI / Legal Technology",
    description:
      "An AI-powered legal assistance system that allows users to enter a legal case or describe a legal issue and retrieves relevant related cases to support legal research and case exploration.",
    technologies: [
      "Python",
      "AI",
      "Machine Learning",
      "NLP"
    ],
    github:
      "https://github.com/tanujadesai1122/LowAssit",
    demo: "https://lowassit.onrender.com"
  },

  {
    title: "Medicine Toxicity Detection System",
    category: "Machine Learning / Healthcare",
    description:
      "A machine learning-based system that analyzes medicine-related input values, including medicine weights and quantities, to predict potential toxicity and display a toxicity percentage or risk score.",
    technologies: [
      "Python",
      "Machine Learning",
      "Data Analysis"
    ],
    github:
      "https://github.com/tanujadesai1122/medical_toxicity_prediction",
    demo: "https://medical-toxicity-prediction.onrender.com"
  }
];

// Skills
const skills = [
  { name: "React", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "Python", icon: Code2 },
  { name: "Node.js", icon: Globe },
  { name: "MongoDB", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Machine Learning", icon: Cpu },
  { name: "IoT", icon: Cpu }
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(0);
  const [repos, setRepos] = useState([]);

  const roles = [
    "React Developer",
    "Frontend Developer",
    "AI & IoT Enthusiast"
  ];

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      setDark(savedTheme === "dark");
    }
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";

    localStorage.setItem(
      "portfolio-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  // Typing-style role rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setRole((current) => (current + 1) % roles.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  // Fetch GitHub repositories
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch GitHub repositories");
        }

        return response.json();
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        setRepos([]);
      });
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">

        <a className="logo" href="#home">
          Portfolio<span>.</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>

          {[
            "Home",
            "About",
            "Skills",
            "Projects",
            "GitHub",
            "Education",
            "Contact"
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}

        </nav>

        <div className="nav-actions">

          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>

      </header>

      <main>

        {/* Home Section */}
        <section id="home" className="hero section">

          <div className="hero-content reveal">

            <p className="eyebrow">
              HELLO, WELCOME TO MY PORTFOLIO
            </p>

            <h1>
              Hi, I'm <span>Tanuja</span>
            </h1>

            <h2 className="role">
              {roles[role]}
            </h2>

            <p className="hero-description">
              I build responsive web applications and explore
              innovative solutions using AI, machine learning,
              and IoT technologies.
            </p>

            <div className="hero-buttons">

              <a className="primary-button" href="#projects">
                Explore My Work
                <ArrowUpRight size={18} />
              </a>

              <a
                className="secondary-button"
                href="/resume.pdf"
                download
              >
                Download Resume
                <Download size={18} />
              </a>

            </div>

            {/* Social links */}
            <div className="social-links">

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Code2 />
              </a>

              <a
                href="https://www.linkedin.com/in/tanuja-desai-16453933b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Briefcase />
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
              >
                <Mail />
              </a>

            </div>

          </div>

          <div className="hero-visual reveal">

            <div className="profile-circle">

              <Code2 size={110} strokeWidth={1.2} />

              <span className="floating-tag tag-one">
                React
              </span>

              <span className="floating-tag tag-two">
                JavaScript
              </span>

              <span className="floating-tag tag-three">
                Python
              </span>

            </div>

          </div>

        </section>

        {/* About Section */}
        <section id="about" className="section reveal">

          <p className="eyebrow">
            GET TO KNOW ME
          </p>

          <h2 className="section-title">
            About <span>Me</span>
          </h2>

          <div className="about-card">

            <p>
              I am a passionate developer interested in creating
              useful, user-friendly applications. I enjoy learning
              new technologies, solving problems, and turning ideas
              into working projects.

              My project experience includes AI-based microplastic
              detection, legal case assistance, medicine toxicity
              prediction, and IoT-based pipeline leakage monitoring.
            </p>

            <p>
              I am continuously improving my skills in frontend
              development, backend development, machine learning,
              and embedded systems.
            </p>

          </div>

        </section>

        {/* Skills Section */}
        <section id="skills" className="section reveal">

          <p className="eyebrow">
            WHAT I WORK WITH
          </p>

          <h2 className="section-title">
            My <span>Skills</span>
          </h2>

          <div className="skills-grid">

            {skills.map(({ name, icon: Icon }) => (
              <div className="skill-card" key={name}>

                <Icon size={27} />

                <span>{name}</span>

              </div>
            ))}

          </div>

        </section>

        {/* Projects Section */}
        <section id="projects" className="section reveal">

          <p className="eyebrow">
            SOME THINGS I'VE BUILT
          </p>

          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>

          <div className="projects-grid">

            {projects.map((project) => (

              <article
                className="project-card"
                key={project.title}
              >

                <div className="project-icon">
                  <Code2 size={30} />
                </div>

                <p className="project-category">
                  {project.category}
                </p>

                <h3>
                  {project.title}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="tech-list">

                  {project.technologies.map((tech) => (
                    <span key={tech}>
                      {tech}
                    </span>
                  ))}

                </div>

                <div className="project-links">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                      <ExternalLink size={16} />
                      
                    </a>
                  ) : (
                    <span className="demo-pending">
                      Live Demo
                    </span>
                  )}

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* GitHub Section */}
        <section id="github" className="section reveal">

          <p className="eyebrow">
            MY OPEN SOURCE ACTIVITY
          </p>

          <h2 className="section-title">
            GitHub <span>Repositories</span>
          </h2>

          {repos.length > 0 ? (

            <div className="github-grid">

              {repos.map((repo) => (

                <a
                  className="github-card"
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >

                  <Code2 />

                  <h3>
                    {repo.name}
                  </h3>

                  <p>
                    {repo.description ||
                      "Explore this repository on GitHub."}
                  </p>

                  <span>
                    {repo.language || "Code"}
                    <ExternalLink size={14} />
                  </span>

                </a>

              ))}

            </div>

          ) : (

            <p className="muted">
              GitHub repositories could not be loaded.
              You can visit my GitHub profile directly.
              {" "}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
              >
                Visit GitHub
              </a>
            </p>

          )}

        </section>

        {/* Education Section */}
        <section id="education" className="section reveal">

          <p className="eyebrow">
            MY LEARNING JOURNEY
          </p>

          <h2 className="section-title">
            Education <span>& Learning</span>
          </h2>

          <div className="about-card">

            <h3>
              B.Tech (AIML)
            </h3>

            <p>
              DY Patil University · 2028
            </p>

            <p>
              Learning Artificial Intelligence,
              Machine Learning, programming,
              and software development.
            </p>

          </div>

        </section>

        {/* Contact Section */}
        <section id="contact" className="section reveal">

          <p className="eyebrow">
            LET'S CONNECT
          </p>

          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>

          <div className="contact-card">

            <p>
              Have an opportunity, project idea, or question?
              Send me a message.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                const data = new FormData(event.currentTarget);

                const subject = encodeURIComponent(
                  data.get("subject")
                );

                const body = encodeURIComponent(
                  `Name: ${data.get("name")}\n` +
                  `Email: ${data.get("email")}\n\n` +
                  `${data.get("message")}`
                );

                window.location.href =
                  `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
              }}
            >

              <input
                name="name"
                placeholder="Your name"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Your email"
                required
              />

              <input
                name="subject"
                placeholder="Subject"
                required
              />

              <textarea
                name="message"
                placeholder="Your message"
                rows="5"
                required
              />

              <button
                className="primary-button"
                type="submit"
              >
                Send Message
                <Mail size={17} />
              </button>

            </form>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <p>
          © {new Date().getFullYear()} Tanuja Desai.
          Built with React.
        </p>

        <a href="#home">
          Back to top ↑
        </a>

      </footer>

    </div>
  );
}
