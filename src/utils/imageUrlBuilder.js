export const imageUrlBuilder = (
  path,
  tmdbImageOption,
  placeholderImageOption
) => {
  const url = `https://image.tmdb.org/t/p/${tmdbImageOption}/${path}`;

  return path ? url : `https://via.placeholder.com/${placeholderImageOption}`;
};
