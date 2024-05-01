
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ label, type, value, onChange, validate }) => {
    const [error, setError] = useState(null);
    console.log(typeof validate, "skldjfksldjklf")

    // const handleValidation = (inputValue) => {
    //     const validationError = validate(inputValue);
    //     setError(validationError);
    //     return validationError;
    // };

    const handleValidation = (inputValue) => {
        if (typeof validate === 'function') {
            const validationError = validate(inputValue);
            setError(validationError);
            console.log(validationError, "errrrrrr");
            return validationError;
        }
        // Handle the case where validate is not a function
        console.error("validate prop is not a function!");
        return null;
    };

    return (
        <TextField
            sx={{ width: '100%', mb: 3 }}
            label={label}
            type={type}
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                handleValidation(e.target.value);
            }}
            error={Boolean(error)}
            helperText={error}
            required
        />
    );
};

export default InputField;
