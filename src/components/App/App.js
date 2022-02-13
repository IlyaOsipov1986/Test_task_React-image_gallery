import React from 'react';
import './App.css';
import Data from './data.json';
import ButtonBlock from '../ButtonBlock/ButtonBlock.js';
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

// Logic for clicking on page number
  handleClick(event) {
    this.setState({
     currentPage: Number(event.target.id)
    });
  }

// Logic for selecting one image
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

// Logic for selecting all images
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

// Logic for deleting one image
  deleteImage(indexSelected) {
    const newImages = this.state.images.filter((image, index) => indexSelected !== index)
    this.setState({
      ...this.state,
      images: newImages
    });
  }
// Logic for deleting all selected images
  deleteSelectedImages() {
    const newImages = this.state.images.filter(image => image.isSelected === false)
    this.setState ({
     ...this.state,
     images: newImages
    });
  }

  render() {
    const { images, currentPage, imagesPerPage } = this.state;
    
  // Logic for displaying images
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const renderImages = currentImages.map((image, index) => {

  // Logic for adding an active class to make visible a checkbox icon
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
          <div className={'icons__left'}>
            <div className={'delete'}><DeleteIcon onClick={() => {this.deleteImage(indexOfFirstImage + index);}} /></div>
          </div>
        </div> 
        <div className={'visibility'}><VisibilityIcon fontSize="large" /></div>
        <img src={image.sample_url} alt='' className="image" />
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
