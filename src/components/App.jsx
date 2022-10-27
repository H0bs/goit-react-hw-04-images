import React, { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery"
import { Container } from "./App.styled";
import { Spinner } from "./Loader/Loader"
import { Button } from "./Button/Button"
import { fetchPhotos } from "./api/api"
import { Modal } from "./Modal/Modal"

export class App extends Component {
  state = {
    inputValue: "",
    photos: [],
    page: 1,
    per_page: 12,
    showButton: "hidden",
    showLoader: false,
    showModal: false,
    imageModal: null,
    error: null,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { photos, inputValue, page, per_page } = this.state;

    if (prevState.inputValue !== inputValue) {
      this.setState({page: 1, photos:[]})
    }

    if ((prevState.inputValue === inputValue & prevState.page === page) ||
      (prevState.inputValue !== inputValue & page !== 1)) {
      return
    }
    this.setState({ showLoader: true });
    try {
      
    const response = await fetchPhotos(inputValue, page, per_page);
      this.setState(prevState => {
        return {
          photos: [...prevState.photos, ...response],
          showLoader: false,
        }
      })
    
      if (photos !== [] & response.length === per_page) {
        this.setState({showButton: "show"})
      } else {
        this.setState({showButton: "hidden"})
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  onSubmit = e => {
    this.setState({ inputValue: e })
  }

  changePage = () => {
    this.setState({page: this.state.page +1})
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
  }))
  }

  imgForModal = ({src, alt}) => {
    this.setState({
      imageModal: { src, alt },
  });
    this.togleModal();
  }

  render() {
    const { photos, showButton, showLoader, showModal , imageModal, error } = this.state;
    return (
      <Container>
        {showLoader === true && <Spinner />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <SearchBar onSubmit={this.onSubmit} />
        {photos.length !== 0 && <ImageGallery photos={photos} onClickModal={this.imgForModal} />}
        {showButton === "show" && <Button onClick={this.changePage} />}
        {showModal === true && <Modal onClose={this.togleModal}>
          <img src={imageModal.src} alt={imageModal.alt} width={960}/>
        </Modal>}
      </Container>
    )
  }
}