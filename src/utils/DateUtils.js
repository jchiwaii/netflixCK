export const formatReleaseDate = (dateString) => {
  if (!dateString) return "Release date not available";

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const getYear = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).getFullYear();
};
