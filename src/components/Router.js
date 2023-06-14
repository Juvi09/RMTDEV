import {
    BASE_API_URL,
    state,
    jobDetailsContentEl,
    getData
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js'
import renderJobList from './JobList.js'


const loadhHashtagChangeHandler = async () => {
    // ! get the id from URL
    const id = window.location.hash.substring(1);

    if (id) {

        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
        // ! remove previous job details content
        jobDetailsContentEl.innerHTML = '';

          // !add a spinner 
          renderSpinner('job-details');

        try {
            // !fetch job item data
              const data = await getData(`${BASE_API_URL}/jobs/${id}`);

          // !extract job item
              const { jobItem } = data;
          
            // ! update state
            state.activeJobItem = jobItem;

            // ! render search job List
            renderJobList();

     
               // !remove spinner 
              renderSpinner('job-details');
     
               // !render job details
              renderJobDetails(jobItem);
           
         } catch(error){
           renderSpinner('job-details');
           renderError(error.message);
         }

    }
};

window.addEventListener('DOMContentLoaded', loadhHashtagChangeHandler);
window.addEventListener('hashchange', loadhHashtagChangeHandler)