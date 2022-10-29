import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from "./ImageGallery.styled";
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ photos, onClickModal }) => {
  return (
    <ImageGalleryList>
      {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
        <GalleryItem
          key={id}
          src={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClickModal={onClickModal}
        />
      ))}
    </ImageGalleryList>
  )
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClickModal: PropTypes.func.isRequired,
};