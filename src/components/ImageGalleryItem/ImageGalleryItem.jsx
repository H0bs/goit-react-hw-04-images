import PropTypes from 'prop-types';
import { ImageGalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({src, tags, largeImageURL, onClickModal}) => {
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        src={src}
        alt={tags}
        onClick={() => onClickModal({src: largeImageURL, alt: tags })}
      />
    </ImageGalleryItem>
  )
}

GalleryItem.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
}