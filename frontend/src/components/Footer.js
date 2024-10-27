// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-slate-200">
//       <div className="container mx-auto p-4">
//         <p className="text-center font-bold" title="Youtube Channel">
//           Continue Coding with Sabuj
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";
//import payment from "../assets/images/payment.png";

const Footer = () => {
  return (
    <div>
      {/* Gradient Background with Padding */}
      <div
        style={{
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          color: "#fff",
          padding: "50px 0",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Legals Section */}
            <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Legals
              </h2>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  About
                </Link>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  Refund Policy
                </Link>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  Terms
                </Link>
              </p>
            </div>

            {/* Information Section */}
            <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Information
              </h2>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  How to Buy
                </Link>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  Contact
                </Link>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                  Complain
                </Link>
              </p>
            </div>

            {/* About Section */}
            <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                About
              </h2>
              <p style={{ marginBottom: "20px" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              {/* <img style={{ width: "100%", borderRadius: "8px" }} src={payment} alt="Payment Methods" /> */}
            </div>

            {/* Social Media Icons */}
            <div style={{ flex: "1", minWidth: "250px", marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Follow Us
              </h2>
              <div style={{ display: "flex", gap: "30px" }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      padding: "10px",
                      backgroundColor: "#3b5998",
                      borderRadius: "50%",
                    }}
                    className="fab fa-facebook-f"
                  ></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      padding: "10px",
                      backgroundColor: "#00acee",
                      borderRadius: "50%",
                    }}
                    className="fab fa-twitter"
                  ></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      padding: "10px",
                      backgroundColor: "#e4405f",
                      borderRadius: "50%",
                    }}
                    className="fab fa-instagram"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "15px 0",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>© 2024 Your Company. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
