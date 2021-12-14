import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Color.css";
import Spinner from "react-bootstrap/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const Color = () => {
  AOS.init();
  const [colors, setColors] = useState();

  const url = "https://x-colors.herokuapp.com/api/random?number=10";

  async function fetchColors() {
    await axios
      .get(url)
      .then((res) => {
        setColors(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchColors();
  }, []);

  function invertColor(hex) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }

    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
  }

  function padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }

  return (
    <>
      {colors !== undefined ? (
        colors.map((color) => (
          <div
            className="container"
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom"
            style={{ background: invertColor(color.hex) }}
          >
            <div
              className="color-boxes"
              onClick={fetchColors}
              data-aos="slide-left"
              data-aos-offset="300"
              data-aos-delay="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              style={{
                background: color.hex,
                border: ".25em black solid",
                // borderRadius: "50%",
                height: "100px",
                width: "100px",
              }}
            ></div>
            <h3 style={{ color: color.hex }}>{color.hex}</h3>
            <h3 style={{ color: color.hex }}>{color.hsl.replace("hsl", "")}</h3>
            <h3 style={{ color: color.hex }}>{color.rgb.replace("rgb", "")}</h3>
            <h3
              style={{
                color: invertColor(color.hex),
                background: color.hex,
                height: "110px",
                width: "110px",
              }}
              data-aos="slide-right"
              data-aos-offset-top="400"
              data-aos-delay="1000"
              data-aos-mirror="true"
              data-aos-once="false"
            >
              {invertColor(color.hex)}
            </h3>
          </div>
        ))
      ) : (
        <Spinner
          className="spinner"
          animation="border"
          role="status"
          size="lg"
          style={{
            color: "#EFD09E",
            display: "block",
            marginLeft: "40%",
            marginTop: "20%",
            height: "10em",
            width: "10em",
          }}
        ></Spinner>
      )}
    </>
  );
};

export default Color;
