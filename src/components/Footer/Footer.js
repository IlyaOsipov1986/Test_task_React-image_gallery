import React, { useState, Component } from 'react';
import './Footer.css';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AddBoxIcon from '@material-ui/icons/AddBox';

const Footer = ({ images, deleteSelectedImages, selectAllImages }) => {

// Logic for counting selected images
  let selected = 0;
  for(let i = 0; i < images.length; i++)
  if(images[i].isSelected == true)
    selected++;
  
  return (
    <div className="footer">
      <div className="left">
        <button className="button button__selecte" title="Выбрать все картинки"><RemoveCircleOutlineIcon onClick={selectAllImages} /></button>
        <div><span className="selected">{selected}</span>выбрано изображений</div>
      </div>
      <div className="center">
        <button className="button" title="Удалить"><DeleteIcon onClick={deleteSelectedImages} /></button>
        <div><AssignmentReturnedIcon /></div>
        <div><CreditCardIcon /></div>
        <div><AddBoxIcon /></div>
      </div>        
      <div className="right">Для отмены нажмите ESC</div>
    </div>
  );        
  }

export default Footer;