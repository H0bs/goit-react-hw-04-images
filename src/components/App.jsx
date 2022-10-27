import { useState, useEffect } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Container } from "./App.styled";
import { Spinner } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { fetchPhotos } from "./api/api";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [showButton, setShowButton] = useState('hidden');
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setShowLoader('true');

    const fetchData = async () => {
      try {
        const response = await fetchPhotos(inputValue, page, per_page);
        setPhotos(photos => [...photos, ...response]);
        setShowLoader('false');

        response.length === per_page ? setShowButton('show') : setShowButton('hidden');
      
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [inputValue, page, per_page]);

  const onSubmit = e => {
    setInputValue(e);
    setPhotos([]);
    setPage(1);
  }

  const changePage = () => {
    setPage(state => state + 1);
  }

  const togleModal = () => {
    setShowModal(!showModal);
  }

  const imgForModal = ({src, alt}) => {
    setImageModal({ src, alt });
    togleModal();
  }
  return (
    <Container>
      <SearchBar onSubmit={onSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {showLoader === true && <Spinner />}
        {photos.length !== 0 && <ImageGallery photos={photos} onClickModal={imgForModal} />}
        {showButton === "show" && <Button onClick={changePage} />}
        {showModal === true && <Modal onClose={togleModal}>
          <img src={imageModal.src} alt={imageModal.alt} width={960}/>
        </Modal>}
      </Container>
  )
}