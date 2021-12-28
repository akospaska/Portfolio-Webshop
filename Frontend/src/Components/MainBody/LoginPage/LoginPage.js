import React from 'react';
import LoginSection from './LoginSection/LoginSection';
import SectionSplitter from './SectionSplitter/SectionSplitter';
import SignUpSection from './SignUpSection/SignUpSection';

const LoginPage = () => {
  return (
    <section id="form">
      <div class="container">
        <div class="row">
          <LoginSection />
          <SectionSplitter />
          <SignUpSection />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
