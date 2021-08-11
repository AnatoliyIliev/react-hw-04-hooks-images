import styles from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ PixabayImage }) => {
  return (
    <>
      {PixabayImage.map(hit => (
        <li className={styles.ImageGalleryItem} key={hit.id}>
          <img
            src={hit.webformatURL}
            alt={hit.user}
            className={styles.ImageGalleryItem_image}
            id={hit.id}
            url={hit.largeImageURL}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  PixabayImage: PropTypes.array.isRequired,
};

export default ImageGalleryItem;
