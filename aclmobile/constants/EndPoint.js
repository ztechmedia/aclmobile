export const baseURL = "http://192.168.43.152:8000/";
// export const baseURL = "http://192.177.200.173:8000/";

export const loadThumbnail = (filename) => {
  return `${baseURL}assets/shipments/thumbnails/${filename}_thumb.jpg`;
};

export const loadImage = (filename) => {
  return `${baseURL}assets/shipments/images/${filename}.jpg`;
};
