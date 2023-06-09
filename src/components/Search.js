  import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    getData
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';

const submitHandler = async event => {
    // !prevent default behaviour
    event.preventDefault();
  
    // !get search text
    const searchText = searchInputEl.value;
  
    // !validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
      renderError('Your search may not contain numbers'); 
      return;
    }
  
    // !blur input
    searchInputEl.blur();

  // !remove previous job items
    jobListSearchEl.innerHTML = '';
  
    // !render spinner
    renderSpinner('search');
  
    // !fetch search results
     try {

      const data = getData(`${BASE_API_URL}/jobs?search=${searchText}`);

       // !extract job items
         const { jobItems }  = data;
   
          //console.log(jobItems);
       // !remoove the spinner
         renderSpinner('search');

       // !render number of results
         numberEl.textContent = jobItems.length;

       // !render job items from the search job list
         renderJobList(jobItems); 

      } catch(error){
  
        renderSpinner('search');
        renderError(error.message);
      }
  
  };
  
  searchFormEl.addEventListener('submit', submitHandler);