export const api = "http://localhost:5000";

export const generatePublicUrl = (fileName) => {
  if (!fileName) return null;

  if (fileName.includes("http")) {
    return fileName;
  }

  return `${api}/public/${fileName}`;
};
