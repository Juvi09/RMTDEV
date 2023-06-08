import {
    BASE_API_URL,
    jobListSearchEl,
    jobDetailsContentEl,
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';

const renderJobList = jobItems => {
    jobItems.slice(0, 7).forEach(jobItem =>{
        const newJobItemHTML = `<li class="job-item">
        <a class="job-item__link" href="${jobItem.id}">
            <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
                <h3 class="third-heading">${jobItem.title}</h3>
                <p class="job-item__company">${jobItem.company}</p>
                <div class="job-item__extras">
                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                </div>
            </div>
            <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                <time class="job-item__time">${jobItem.daysAgo}d</time>
            </div>
        </a>
    </li>
    `;
    jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
  })
};

//import renderSpinner from './Spinner.js';
 
const clickHandler = () => {
    // !prevent default behaviour (navigation)
    event.preventDefault();

    // !get clicked job item element
    const jobItemEL = event.target.closest('.job-item');

    // !remove the active class from previously aactive job item
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // !add active class
    jobItemEL.classList.add('job-item--active');

    // !empty the job details section
    jobDetailsContentEl.innerHTML = '';
 
    // !render spinner
    renderSpinner('job-details');

    // !get id
    const id = jobItemEL.children[0].getAttribute('href');

    // !fetch job item data
    fetch(`${BASE_API_URL}/jobs/${id}`)
        .then(response => {
          if (!response.ok) { // !4xx, 5xx status code
            throw new Error('Resource issue (e.g. resource doesn\'t exist) or server issue');
         }

          return response.json();

        })
        .then(data => {
          // !extract job item
          const { jobItem } = data;

          // !remove spinner 
          renderSpinner('job-details');

          // !render job details
          renderJobDetails(jobItem);

        })
        .catch(error => { // !Network problem or other errors  (e.g trying to parse something that is not JSON as JSON)
          renderSpinner('search');
          renderError(error.message);
        }); 
    

};

jobListSearchEl.addEventListener('submit', clickHandler);

export default renderJobList;