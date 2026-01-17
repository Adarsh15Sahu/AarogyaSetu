import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">
                    
                    <h3>HealthConnect</h3>
                    <p>
                        Connecting doctors and patients for healthier communities.
                    </p>
                </div>

                {/* About */}
                <div className="footer-column">
                    <h4>About Us</h4>
                    <ul>
                        <li>Our Mission</li>
                        <li>Team</li>
                        <li>Careers</li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-column">
                    <h4>Support</h4>
                    <ul>
                        <li>FAQ</li>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="footer-column">
                    <h4>Legal & Privacy</h4>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Security</li>
                    </ul>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <p>© 2025 HealthConnect. All rights reserved.</p>

                <div className="social-icons">
                    <span>f</span>
                    <span>🐦</span>
                    <span>📸</span>
                    <span>in</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
