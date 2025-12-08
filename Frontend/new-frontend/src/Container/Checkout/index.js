import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/cart")}
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#0f2a1d",
          mb: 3,
          borderRadius: "20px",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Back to Cart
      </Button>

        <Box>
            Order Summary
        </Box>

    </Box>
  );
};

export default CheckoutPage;
