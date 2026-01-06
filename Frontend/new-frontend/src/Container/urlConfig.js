const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://scarlett-marque.onrender.com";

export const api = baseUrl;

export const generatePublicUrl = (fileName) => {
  if (!fileName) return null;

  if (fileName.includes("http")) {
    return fileName;
  }

  return `${api}/public/${fileName}`;
};