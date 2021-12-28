import React from 'react';

const BreadCrumbs = (props) => {
  return (
    <div class="breadcrumbs">
      <ol class="breadcrumb">
        <li>
          <a href="#">Home</a>
        </li>
        <li class="active">{props.text}</li>
      </ol>
    </div>
  );
};

export default BreadCrumbs;
