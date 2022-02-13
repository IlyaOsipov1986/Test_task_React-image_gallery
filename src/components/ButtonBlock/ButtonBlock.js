import React from 'react';
import './ButtonBlock.css';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';


const ButtonBlock = ({ images, deleteSelectedImages, selectAllImages }) => {

  let selected = 0;
  for(let i = 0; i < images.length; i++)
  if(images[i].isSelected === true)
    selected++;
  
  return (
    <div className={'block__wrapper'}>
      <div className={'wrapper__buttons'}>
          <button className={'buttons__button-select'}><RemoveCircleOutlineIcon onClick={selectAllImages}/></button>
              <span className={'buttons__select-img'}>{selected}</span><span>изображений выбрано</span>
      </div>
      <div>
        <button className={'buttons__button-delete'}><DeleteIcon onClick={deleteSelectedImages} /></button>
      </div>
        <div>Для отмены нажмите ESC</div>
    </div>
  );        
  }

export default ButtonBlock;