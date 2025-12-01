import { Padding } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "#0f2a1d",
          color: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          fontSize: "30px",
          fontWeight: "bolder",
        }}
      >
        <h3>About Scarlett Marque</h3>
        <h5>....................</h5>

        <Box>
          <Button
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: "18px",
              padding: "10px",
            }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
            Back To Store
          </Button>
        </Box>
      </Box>

      {/* <Box
        component="img"
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="About"
        sx={{ width: "100%", boxShadow: 3 }}
      ></Box> */}
    </Box>
  );
};

export default AboutPage;
