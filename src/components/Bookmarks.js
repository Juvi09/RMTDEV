import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList';

const mouseEnterHandler = () => {
    // ! make bookmark button look active.
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    // ! make jobList visible 
    jobListBookmarksEl.classList.add('job-list--visible');
};


bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouaseLeaveHandler);
