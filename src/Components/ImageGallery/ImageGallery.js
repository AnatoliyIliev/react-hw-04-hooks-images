// import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.scss';

function ImageGallery({ PixabayImage, onClick }) {
  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <ul className={styles.ImageGallery} onClick={onClick}>
        <ImageGalleryItem PixabayImage={PixabayImage} />
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  PixabayImage: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
