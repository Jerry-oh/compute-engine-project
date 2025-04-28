import React, { useEffect, useState } from "react";
import { Row, Col } from "react-flexbox-grid";
// SCSS
import "./hero.scss";
//Assets
import HeroImage from "../../assets/hero/hero-image.png";
//Components
import Button from "../ui-components/button/button";

const Hero = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/v1/hello");
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
              <h1 className="weight800 font60">
                We Are Creative Digital Agency.
              </h1>
              <p className="font12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
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
