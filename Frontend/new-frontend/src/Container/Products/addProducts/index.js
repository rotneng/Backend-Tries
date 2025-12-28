import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CloudUpload, Delete } from "@mui/icons-material";
import { addProduct } from "../../../Actions/product.actions";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    sizes: "",
    colors: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const validFiles = files.filter((file) => file.type.startsWith("image/"));

      if (validFiles.length !== files.length) {
        setError("Some files were skipped because they are not valid images.");
      }

      setImages((prevImages) => [...prevImages, ...validFiles]);
      setError("");
    }
  };
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleAddProduct = async () => {
    if (!formData.title || !formData.price || !formData.category) {
      setError("Title, Price and Category are required");
      return;
    }

    if (images.length === 0) {
      setError("At least one product image is required");
      return;
    }

    setLoading(true);

    try {
      const submissionData = new FormData();

      submissionData.append("title", formData.title);
      submissionData.append("description", formData.description);
      submissionData.append("price", formData.price);
      submissionData.append("category", formData.category);
      submissionData.append("stock", formData.stock);
      submissionData.append("sizes", formData.sizes);
      submissionData.append("colors", formData.colors);

      images.forEach((file) => {
        submissionData.append("images", file);
      });
      await dispatch(addProduct(submissionData, navigate));
    } catch (error) {
      console.log("error in adding products", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 5, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Box
        sx={{
          bgcolor: "#0f2a1d",
          color: "white",
          p: { xs: 2, md: 3 },
          textAlign: "center",
          mb: { xs: 3, md: 4 },
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        >
          Add Products
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "600px",
          width: { xs: "90%", sm: "80%", md: "600px" },
          margin: "0 auto",
          p: { xs: 2, md: 4 },
          borderRadius: 2,
        }}
      >
        <TextField
          label="Title"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          onChange={handleInputChange}
          value={formData.description}
          multiline
          rows={3}
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="Price"
            name="price"
            type="number"
            onChange={handleInputChange}
            value={formData.price}
            fullWidth
            required
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            onChange={handleInputChange}
            value={formData.stock}
            fullWidth
          />
        </Box>

        <TextField
          label="Category"
          name="category"
          onChange={handleInputChange}
          value={formData.category}
          fullWidth
          required
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            label="Sizes (e.g. S, M, L)"
            name="sizes"
            onChange={handleInputChange}
            value={formData.sizes}
            fullWidth
          />
          <TextField
            label="Colors (e.g. Red, Blue)"
            name="colors"
            onChange={handleInputChange}
            value={formData.colors}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            border: "1px dashed grey",
            p: 2,
            borderRadius: 1,
            textAlign: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            sx={{
              mb: 1,
              color: "#0f2a1d",
              borderColor: "#0f2a1d",
              "&:hover": {
                borderColor: "#144430",
                bgcolor: "rgba(15, 42, 29, 0.04)",
              },
            }}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              onChange={handleImage}
              accept="image/*"
            />
          </Button>
          {images.length > 0 && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "rgba(255,255,255,0.7)",
                      padding: "2px",
                      "&:hover": { bgcolor: "white", color: "red" },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Typography
                variant="caption"
                display="block"
                width="100%"
                sx={{ mt: 1 }}
              >
                {images.length} file(s) selected
              </Typography>
            </Box>
          )}
        </Box>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleAddProduct}
          disabled={loading}
          sx={{
            bgcolor: "#0f2a1d",
            color: "white",
            py: 1.5,
            fontSize: "16px",
            "&:hover": { bgcolor: "#144430" },
            mt: 1,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Product"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default AddProducts;
