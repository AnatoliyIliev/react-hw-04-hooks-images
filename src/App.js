import { useState, useEffect } from 'react';
import './App.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PixabayAPI } from './services/PixabayAPI';
import Button from './Components/Button';
import Loading from './Components/Loader';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';

function App() {
  const [PixabayImage, setPixabayImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [activeId, setActiveId] = useState(null);
  const [alt, setAlt] = useState('');
  const [url, setUrl] = useState('');

  const submitForm = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  async function fetchUpdate() {
    setLoading(true);

    try {
      const PixabayImageHins = await PixabayAPI(searchQuery, page);

      setPixabayImage([...PixabayImage, ...PixabayImageHins.hits]);

      setPage(page + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);
    setPixabayImage([]);

    fetchUpdate();
  }, [fetchUpdate, searchQuery]);

  const toggleModal = () => {
    const onReversModal = !showModal;

    setShowModal(onReversModal);
  };

  const isOpenModal = event => {
    // setActiveId(event.target.id);
    setAlt(event.target.alt);
    setUrl(event.target.attributes.url.nodeValue);

    toggleModal();
  };

  const LoadMoreButton = !(PixabayImage.length < 12) && !loading;

  return (
    <div>
      <Searchbar onSubmit={submitForm} />
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {loading && <Loading />}
      <ImageGallery PixabayImage={PixabayImage} onClick={isOpenModal} />
      <ToastContainer autoClose={3000} />
      {LoadMoreButton && <Button onFetch={fetchUpdate} />}
      {showModal && (
        <Modal onClose={toggleModal} onClick={isOpenModal}>
          <img src={url} alt={alt} />
        </Modal>
      )}
    </div>
  );
}

export default App;
