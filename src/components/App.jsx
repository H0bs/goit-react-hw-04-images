import { useState, useEffect } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Container } from "./App.styled";
import { Spinner } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { fetchPhotos } from "../api/api";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageToModal, setImageToModal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setShowLoader(true);

    const fetchData = async () => {
      try {
        const response = await fetchPhotos(inputValue, page);
        setPhotos(photos => [...photos, ...response]);
        setShowLoader(false);
        if (response.length === 0) {
          setError("Oops, we haven't images");
        }
        
      } catch (error) {
        setError(error.message);
        setShowLoader(false);
      }
    }
    fetchData();
  }, [inputValue, page]);

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

  const imgForModal = options => {
    setImageToModal(options);
    togleModal();
  }
  return (
    <Container>
      <SearchBar onSubmit={onSubmit} />
        {error && <p> {error}</p>}
        {showLoader && <Spinner />}
        {photos.length !== 0 && <ImageGallery photos={photos} onClickModal={imgForModal} />}
        {(photos.length%12 === 0 && photos.length !== 0) && <Button onClick={changePage} />}
        {showModal && <Modal onClose={togleModal}>
          <img src={imageToModal.src} alt={imageToModal.alt} width={960}/>
        </Modal>}
      </Container>
  )
}