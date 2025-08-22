import errorHandler from "./errorHandler.js";

const asyncHandler = (fn) => async (...args) => {
     await Promise.resolve(fn(...args)).catch((error) => {
        errorHandler(error.message || 'An unexpected error occurred');
    });
};

export default asyncHandler;
