import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

const clickHandler = event => {
    
    // !get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');

    // !stop function if no clicked button element.
    if (!clickedButtonEl) return;

    // ! update state (reset to page 1).
    state.currentPage = 1;

    // ! check if intention is recent or relevant sorting
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    // ! sort job items
    // How [].sort works:- return positive number to sort b higher than a. return negative number to sort a higher than b, return 0 to stay same.
    if (recent) {
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a,b) => {
            return b.relevantScore - a.relevantScore;  // e.g. if a.relevantScore = 94 and b.relevantScore = 78, then a is more relevant. a should be sorted higher than b. return a negative number.
        });
    }


};

sortingEl.addEventListener('click', clickHandler);