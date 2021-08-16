import { useState, useEffect, useRef } from 'react';
import './App.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PixabayAPI from './services/PixabayAPI';
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

  // const onReversModal = useRef(showModal);
  const onLoading = useRef(loading);

  const submitForm = searchQuery => {
    // console.log('searchQuery', searchQuery);
    console.log('searchQuery', page);
    setSearchQuery(searchQuery);
    setPixabayImage([]);
    setPage(1);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchUpdate();
  }, [searchQuery]);

  const fetchUpdate = () => {
    setLoading(!onLoading.current);

    PixabayAPI.fetchImages(searchQuery, page)
      .then(PixabayImageHins => {
        setPixabayImage([...PixabayImage, ...PixabayImageHins.hits]);
        setPage(prevPage => prevPage + 1);
        console.log('fetchUpdate', page);
      })
      .catch(error => setError(error.message))
      .finally(() => {
        console.log('сработал finally');
        setLoading(onLoading.current);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log('toggleModal', showModal);
  };

  const isOpenModal = event => {
    // setActiveId(event.target.id);
    setAlt(event.target.alt);
    setUrl(event.target.attributes.url.nodeValue);

    console.log('isOpenModal', showModal);
    setLoading(onLoading.current);

    toggleModal(false);
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
