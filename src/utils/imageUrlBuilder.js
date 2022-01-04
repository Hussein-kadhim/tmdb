export const imageUrlBuilder = (path, width, height) => {
  const url = `https://image.tmdb.org/t/p/w${width}_and_h${height}_bestv2/${path}`;

  return path ? url : `https://via.placeholder.com/${width}`;
};
