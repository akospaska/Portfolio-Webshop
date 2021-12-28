import React from 'react';

const columnData = [
  { name: 'Onlne Help', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'Order Status', href: '#' },
  { name: 'Change Location', href: '#' },
  { name: "FAQ's", href: '#' },
];

const FooterWidgetColumn = (props) => {
  return (
    <div class="col-sm-2">
      <div class="single-widget">
        <h2>Service</h2>
        <ul class="nav nav-pills nav-stacked">
          {props.columnData.map((a) => (
            <li>
              <a href={a.href}>{a.name}</a>{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterWidgetColumn;
