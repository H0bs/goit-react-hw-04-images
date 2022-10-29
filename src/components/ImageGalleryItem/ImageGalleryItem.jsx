import PropTypes from 'prop-types';
import { ImageGalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({ src, tags, largeImageURL, onClickModal }) => {
  const options = {
    src: largeImageURL,
    alt: tags
  }
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        src={src}
        alt={tags}
        onClick={() => onClickModal(options)}
      />
    </ImageGalleryItem>
  )
}

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
}