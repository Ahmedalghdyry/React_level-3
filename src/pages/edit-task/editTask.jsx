import './editTask.css';

import React from 'react';
import Header from 'comp/header';
import Footer from 'comp/Footer';
import { Helmet } from 'react-helmet-async';

const EditTask = () => {
  return (
    <div>
    
          <Helmet>
            <title>edit-task page</title>
          </Helmet>

          <Header />

          <div className='edit-task'>
            {/* Title */}

            <section>
              <h1>
                <input className='title-input' type="text" />
              </h1>
            </section>

            {/* Sub-tasks section */}

            {/* Add-more BTN && Delete BTN */}
          </div>
          <Footer />
    </div>
  );
}

export default EditTask;
