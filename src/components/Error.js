import {
   errorTextEl,
   errorEl
} from '../common.js';

const renderError = (message = 'Something went wrong!') => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    }, 3200);
};

export default renderError;