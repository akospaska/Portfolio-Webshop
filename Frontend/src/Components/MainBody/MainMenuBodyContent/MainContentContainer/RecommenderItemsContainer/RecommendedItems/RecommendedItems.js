import React, { Component } from 'react';
import ListItemContent from '../../CategoryContainer/ListItemContent/ListItemContent';

const RecommendedItems = (props) => {
  return (
    <div class={`item ${props.isActive}`}>
      <ListItemContent imgID={1} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={4} />
      <ListItemContent imgID={2} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={4} />
      <ListItemContent imgID={4} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={4} />
    </div>
  );
};

export default RecommendedItems;
