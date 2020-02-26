import React from 'react';

export const Loader = () => {
    return (
        <>
            <p className="visually-hidden">Loading...</p>
            <div className="lds-roller" aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
};