import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29676871-837cab832e208c22136e7205d"

export const fetchPhotos = async (value, page, per_page) => {
  const response = await axios.get(``, {
    params: {
      q: value,
      page: page,
      key: `${KEY}`,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: per_page,
    }
  });

  return await response.data.hits.map(photo => ({
    id: photo.id,
    webformatURL: photo.webformatURL,
    tags: photo.tags,
    largeImageURL: photo.largeImageURL,
  }))
}