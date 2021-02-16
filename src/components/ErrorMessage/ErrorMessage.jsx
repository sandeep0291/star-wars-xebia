import React from 'react';
import './errorMessage.scss';

export const ErrorMessage = function({message}){
    return(
        <div className='errror-message-container'>
            <span className='message'>{message}</span>
        </div>
    );
}

export default ErrorMessage;