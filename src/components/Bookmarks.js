import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList';

const clickHandler = () => {
    // ! don't continue if click bookmarks button.
    if (event.target.claasName.includes('bookmark')) return;

    // ! update state
    if (state.bookmarkJobitems.some(bookmarkJobitem => bookmarkJobitem.id === state.activeJobItem.id)){
        state.bookmarkJobitems = state.bookmarkJobitems.filter(bookmarkJobitem => bookmarkJobitem.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobitems.push(state.activeJobItem);
    }

    // ! persist data with localStorage
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobitems));
    

    // ! update bookmark icon
    document.querySelector('.job-info__bookamrk-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

    // ! render search JobList
    renderJobList();

};

const mouseEnterHandler = () => {
    // ! make bookmark button look active.
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    // ! make jobList visible 
    jobListBookmarksEl.classList.add('job-list--visible');

    // ! render bookmarks job list.
    renderJobList('bookmarks');
};


const mouseLeaveHandler = () => {
       // ! make bookmark button look active.
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    // ! make jobList visible 
    jobListBookmarksEl.classList.add('job-list--visible');
};


jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
