import { useRef, useState } from "react";
import './Dashboard.css';
import settingsLogo from "../assets/settings.svg"
import Particles from './Particles';

export default function Dashboard() {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const [buttonText, setButtonText] = useState("Play Converted Sound");

  const handleClick = () => {
    const speechSynth = window.speechSynthesis;
    const enteredText = textRef.current?.value?.trim();
    if (!enteredText) {
      setError("Nothing to Convert! Enter text in the text area !!!");
      return;
    }
    setError("");
    const newUtterance = new SpeechSynthesisUtterance(enteredText);
    speechSynth.speak(newUtterance);
    setButtonText("Sound is Playing...");
    newUtterance.onend = () => {
      setButtonText("Play Converted Sound");
    };
  };

  return (
    <div className="main-container">
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={900}
          particleSpread={20}
          speed={0.2}
          particleBaseSize={300}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="settings">
        <div className="settings-content">
          <div className="settings-image" onClick={toggleMenu}>
            <img src={settingsLogo} />
          </div>
          {open && (
            <div className="dropdown-menu">
              <div className="menu-arrow"></div>
              <ul>
                <li>Settings</li>
              </ul>
            </div>
          )}
          <a className="contact-btn-width" href="https://esakkimuthua-portfolio.netlify.app/app/dashboard" target="_blank">
            Contact Us
          </a>
        </div>
      </div>
      <div className="card-content">
        <div className="card">
          <h2 className="card-heading">Text to <span>Speech</span> Converter</h2>
          <p className="card-paragraph">Enter text and convert into <span>speech</span></p>
          <div className="text-area-field">
            <textarea placeholder="Enter the text" ref={textRef} className="input-control"></textarea>
          </div>
          <p className="error-para">{error}</p>
          <button className="play-button" onClick={handleClick}>{buttonText}</button>
        </div>
      </div>
      <div className="footer">
        <p className="footer-title">Text-to-Speech Converter</p>
        <p className="footer-description">Convert text to speech effortlessly with our powerful and user-friendly tool. Enhance accessibility and productivity.</p>
        <p className="footer-copyright">&copy; 2025 Text-to-Speech Converter. All rights reserved.</p>
      </div>
    </div>
  );
}
