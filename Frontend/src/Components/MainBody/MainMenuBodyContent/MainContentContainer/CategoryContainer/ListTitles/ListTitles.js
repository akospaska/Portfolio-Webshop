import React, { Component } from 'react';
const ListTitles = (props) => {
  return (
    <li class={props.isActive}>
      <a href={props.href} data-toggle="tab">
        {props.name}
      </a>
    </li>
  );
};

export default ListTitles;
