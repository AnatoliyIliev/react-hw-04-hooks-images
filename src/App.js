import { Component } from 'react';
import './App.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PixabayAPI } from './services/PixabayAPI';
import Button from './Components/Button';
import Loading from './Components/Loader';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';

class App extends Component {
  state = {
    PixabayImage: [],
    searchQuery: '',
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    activeId: null,
    alt: '',
    url: '',
  };

  submitForm = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ loading: true, PixabayImage: [] });
      this.fetchUpdate();
    }
  }

  fetchUpdate = async () => {
    const { searchQuery, page } = this.state;
    const options = { searchQuery, page };

    this.setState({ loading: true });
    try {
      const PixabayImageHins = await PixabayAPI(options);

      this.setState(prevState => ({
        PixabayImage: [...prevState.PixabayImage, ...PixabayImageHins.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  isOpenModal = event => {
    this.setState({
      activeId: event.target.id,
      alt: event.target.alt,
      url: event.target.attributes.url.nodeValue,
    });
    this.toggleModal();
  };

  render() {
    const { PixabayImage, loading, error, showModal, url, alt } = this.state;
    const LoadMoreButton = !(PixabayImage.length < 12) && !loading;

    return (
      <div>
        <Searchbar onSubmit={this.submitForm} />
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
        {loading && <Loading />}
        <ImageGallery PixabayImage={PixabayImage} onClick={this.isOpenModal} />
        <ToastContainer autoClose={3000} />
        {LoadMoreButton && <Button onFetch={this.fetchUpdate} />}
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.isOpenModal}>
            <img src={url} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
