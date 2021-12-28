import React from 'react';
import ChoseArea from './ChoseArea/ChoseArea';
import TotalArea from './TotalArea/TotalArea';

const DoActionContainer = () => {
  return (
    <section id="do_action">
      <div class="container">
        <div class="heading">
          <h3>What would you like to do next?</h3>
          <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
        </div>
        <div class="row">
          <ChoseArea />
          <TotalArea />
        </div>
      </div>
    </section>
  );
};

export default DoActionContainer;
