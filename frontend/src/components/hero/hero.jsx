import React, { useEffect, useState } from "react";
import { Row, Col } from "react-flexbox-grid";
// SCSS
import "./hero.scss";
//Assets
import HeroImage from "../../assets/hero/Google-Compute-Engine.png";
//Components
import Button from "../ui-components/button/button";

const Hero = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/hello");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Failed to load message");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="hero" id="hero">
      <div className="wrapper">
        <Row>
          <Col md={12} lg={6}>
            <div className="hero-info">
              <h1 className="weight800 font60">{message}</h1>
              <p className="font12">
                Project tugas komputasi awan menggunakan Compute Engine, Dibuat
                oleh tim Cloud-Project dari kelas IF-A Sore dengan Dosen Ericky
                Benna Perolihin Manurung, S.Kom., M.Kom.
              </p>
              <Button label="SEND MESSAGE" target={"contact"} />
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div className="hero-image">
              <img src={HeroImage} alt="hero" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hero;
