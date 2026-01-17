import React from "react";
import "./Hero_feature.css";

function Hero_feature() {
    
    return (
        <>
            {/* ================= HOW IT WORKS ================= */}
            <section className="features-section">
                <h2 className="section-title">How HealthConnect Works</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">🔗</div>
                        <h3>Connect Securely</h3>
                        <p>
                            Doctors and patients link effortlessly for seamless
                            communication and data exchange.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">📄</div>
                        <h3>Prescribe Efficiently</h3>
                        <p>
                            Generate, manage, and send digital prescriptions with
                            ease, reducing paperwork.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">📈</div>
                        <h3>Track Progress</h3>
                        <p>
                            Monitor patient health records and prescription history
                            anytime, anywhere.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= TRUST SECTION ================= */}
            <section className="features-section light-bg">
                <h2 className="section-title">Your Trust, Our Priority</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">🔒</div>
                        <h3>Robust Data Security</h3>
                        <p>
                            Advanced encryption and security protocols safeguard all
                            sensitive health data.
                        </p>
                        <span className="badge">AES-256 Encryption</span>
                    </div>

                    <div className="feature-card">
                        <div className="icon">🛡️</div>
                        <h3>Unwavering Privacy</h3>
                        <p>
                            Strict adherence to privacy regulations ensures patient
                            confidentiality at all times.
                        </p>
                        <span className="badge">HIPAA Compliant</span>
                    </div>

                    <div className="feature-card">
                        <div className="icon">👤</div>
                        <h3>Role-Based Access</h3>
                        <p>
                            Access controlled by defined roles, ensuring only
                            authorized personnel view specific data.
                        </p>
                        <span className="badge">Secure Permissions</span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero_feature;
