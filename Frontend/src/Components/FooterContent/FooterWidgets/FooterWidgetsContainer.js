import React from 'react';
import FooterWidgetColumn from './FooterWidgetColumn/FooterWidgetColumn';

import { columnData1, columnData2, columnData3, columnData4 } from './FooterWidgetColumn/FooterColumnDataForExport';
import EmailSubForm from './EmailSubForm/EmailSubForm';

const FooterWidgetsContainer = () => {
  return (
    <div class="footer-widget">
      <div class="container">
        <div class="row">
          <FooterWidgetColumn columnData={columnData1} />
          <FooterWidgetColumn columnData={columnData2} />
          <FooterWidgetColumn columnData={columnData3} />
          <FooterWidgetColumn columnData={columnData4} />
          <EmailSubForm />
        </div>
      </div>
    </div>
  );
};

export default FooterWidgetsContainer;
