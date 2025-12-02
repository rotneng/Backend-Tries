import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        style={{
          padding: "1px",
          backgroundColor: "#0f2a1d",
          color: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          fontWeight: "bolder",
        }}
      >
        <h3>About Scarlett Marque</h3>
      </Box>

      <Box style={{ display: "flex", padding: "20px" }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="About"
          sx={{ width: "47.5%", boxShadow: 3, margin: 2 }}
        ></Box>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="About"
          sx={{ width: "47.5%", boxShadow: 3, margin: 2 }}
        ></Box>
      </Box>

      <Box
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <Box>
          <h1>Why Shop With Us?</h1>
        </Box>

        <Box>
          <Box style={{ margin: 3, color: "#0f2a1d" }}>
            <LocalShippingIcon />
            <h3>Fast Delivery</h3>
            <p>
              We know you want your items fast. We ensure your products arrive
              on time, Every time
            </p>
          </Box>
          <Box style={{ margin: 3, color: "#0f2a1d" }}>
            <SecurityIcon />
            <h3>Secure Payments</h3>
            <p>
              Your security is our priority. We use top tier encryprion to
              ensure your data and money are always safe
            </p>
          </Box>
          <Box style={{ margin: 3, color: "#0f2a1d" }}>
            <SupportAgentIcon />
            <h3>24/7 Support</h3>
            <p>
              Got a question? Our friendly support team is here around the clock
              to assist you with anything you need.
            </p>
          </Box>
        </Box>
      </Box>

      <Box style={{padding: "20px"}}>
        <Box>
          <h2>Ready to find something special?</h2>
        </Box>

        <Button
          style={{
            color: "white",
            backgroundColor: "#0f2a1d",
            borderRadius: "18px",
            padding: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Shop Now
        </Button>
      </Box>

      <Box
        style={{
          padding: "1px",
          backgroundColor: "#0f2a1d",
          color: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          fontWeight: "bolder",
        }}
      >
        
      </Box>
    </Box>
  );
};

export default AboutPage;
