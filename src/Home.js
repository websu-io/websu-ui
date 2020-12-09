import React from 'react';
import GenerateReportForm from './GenerateReportForm';
import LoadingReportViewer from './LoadingReportViewer';

const Home = ({onSubmit, url, setUrl, formFactor, setFormFactor, jsonReport, loading}) => {
    return (
        <div>
           <header className="bg-primary text-white">
              <div className="container text-center">
                  <h1>Websu - Speed testing your web pages</h1>
                  <p className="lead">
                     Optimize your web applications for speed using Lighthouse. Generate a
                     report below or integrate with the API.
                  </p>
                <div className="row justify-content-center">
                  <div className="col-6">
                    <GenerateReportForm onSubmit={onSubmit} url={url} setUrl={setUrl}
                        formFactor={formFactor} setFormFactor={setFormFactor} />
                  </div>
              </div>
            </div>
            </header>
            <div className="container-fluid text-center">
              <LoadingReportViewer loading={loading} jsonReport={jsonReport} />
            </div>
        </div>
    );
};

export default Home;
