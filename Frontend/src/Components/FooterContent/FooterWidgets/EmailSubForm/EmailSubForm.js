import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

const EmailSubForm = () => {
  return (
    <div class="col-sm-3 col-sm-offset-1">
      <div class="single-widget">
        <h2>About Shopper</h2>
        <form action="#" class="searchform">
          <input type="text" placeholder="Your email address" />
          <button type="submit" class="btn btn-default">
            <i>
              <FaArrowCircleRight />
            </i>
          </button>
          <p>
            Get the most recent updates from <br />
            our site and be updated your self...
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailSubForm;
