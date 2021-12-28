import React, { Component } from 'react';
import ListItemContent from './ListItemContent/ListItemContent';
import ListTitles from './ListTitles/ListTitles';

const CategoryContainer = () => {
  return (
    <div class="category-tab">
      <div class="col-sm-12">
        <ul class="nav nav-tabs">
          <ListTitles name="T-Shirt" isActive="active" href="t_shirts" />
          <ListTitles name="Blazers" isActive="" href="t_shirts" />
          <ListTitles name="Sunglass" isActive="" href="t_shirts" />
          <ListTitles name="Kids" isActive="" href="t_shirts" />
          <ListTitles name="Polo Shirt" isActive="" href="t_shirts" />
        </ul>
      </div>
      <div class="tab-content">
        <div class="tab-pane fade active in" id="tshirt">
          <ListItemContent imgID={1} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={3} />
          <ListItemContent imgID={2} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={3} />
          <ListItemContent imgID={3} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={3} />
          <ListItemContent imgID={4} price={48} name={'Easy Polo Black Edition'} href={''} columnLength={3} />
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;
