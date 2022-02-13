import React from 'react';
import './App.css';
import Data from './data.json';
import ButtonBlock from './components/ButtonBlock/ButtonBlock.js';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: Data.map(item => {
        return {
          ...item,
          isSelected: false
        };
      }),
      currentPage: 1,
      imagesPerPage: 6,
      selectAllChecked: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.selectedImages = this.selectedImages.bind(this);
    this.deleteSelectedImages = this.deleteSelectedImages.bind(this);
    this.selectAllImages = this.selectAllImages.bind(this);

  }

  handleClick(event) {
    this.setState({
     currentPage: Number(event.target.id)
    });
  }

  selectedImages(indexSelected) {
    const nextImagesState = this.state.images.map((image, index) => {
    let nextSelectedState = image.isSelected;
    if (index === indexSelected) {
      nextSelectedState = !image.isSelected;
    }
    return {
      ...image,
      isSelected: nextSelectedState
    };
    });
        
    this.setState({
      ...this.state,
      images: nextImagesState,
      });
    }

  selectAllImages(){
    let selectAllChecked = !this.state.selectAllChecked;
    this.setState({
      selectAllChecked: selectAllChecked
     });

    let images = this.state.images.slice();
    if(selectAllChecked){
      for(let i = 0; i < this.state.images.length; i++)
        images[i].isSelected = true;
      } else {
        for(let i = 0; i < this.state.images.length; i++)
        images[i].isSelected = false;
      }

      this.setState({
      images: images
     });
  }


  deleteImage(indexSelected) {
    const newImages = this.state.images.filter((image, index) => indexSelected !== index)
    this.setState({
      ...this.state,
      images: newImages
    });
  }

  deleteSelectedImages() {
    const newImages = this.state.images.filter(image => image.isSelected === false)
    this.setState ({
     ...this.state,
     images: newImages
    });
  }

  render() {
    const { images, currentPage, imagesPerPage } = this.state;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const renderImages = currentImages.map((image, index) => {

      let classNames = 'checkbox';
      if (image.isSelected === true) {
      classNames += ' active';
    }

    return (
      <div key={index} className={'images'}>
        <div className={'icons'}>
          <div className={classNames}>
            <input type={'checkbox'} className={'checkbox-select'} checked={image.isSelected}
              onChange={() => {
              this.selectedImages(indexOfFirstImage + index);}}
            />
        </div>
          <div className={'icons__del'}>
            <div className={'delete'}><DeleteIcon onClick={() => {this.deleteImage(indexOfFirstImage + index);}} /></div>
          </div>
        </div> 
        <div className={'visibility'}><VisibilityIcon fontSize="large" /></div>
        <img src={image.sample_url} alt='' className={'image'} />
            <span className={'text'}>{image.name}</span>
      </div>
      )});

   const pageNumbers = [];
       for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++)
      pageNumbers.push(i)

     const renderPageNumbers = pageNumbers.map(number => {
       return (
      <div
         key={number}
          id={number}
          className={ number === this.state.currentPage ? 'pagination activepage': 'pagination'}
         onClick={this.handleClick}>
           {number}
         </div>
       );
      });

    return (
      <div className="App">
        <div className={'header'}>{this.state.images.length} ИЗОБРАЖЕНИЙ</div>
        <div className={'wrapper'}>{renderImages}</div>
        <div className={'pages'}>{renderPageNumbers}</div>
        <ButtonBlock images={images} selectAllImages={this.selectAllImages} deleteSelectedImages={this.deleteSelectedImages} />
      </div>
    );
  }
}

export default App;
