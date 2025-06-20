export const getGenreNames = (genreIds, genreList) => {
  if (!genreIds || !genreList) return "Loading...";

  const names = genreIds
    .map((id) => {
      const genre = genreList.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter(Boolean);

  return names.length > 0 ? names.join(" | ") : "Genre not available";
};
