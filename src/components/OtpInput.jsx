import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

export const OtpInput = (props) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Get the div that contains the inputs
    const inputContainer = document.getElementById('input-container');
    
    // Check if the container exists
    if (inputContainer) {
      // Get all input elements within the div
      const inputs = inputContainer.getElementsByTagName('input');
      
      // Loop through each input and change its type to 'number'
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].type = 'number';
        inputs[i].pattern = "[0-9]*";
        inputs[i].inputMode = "numeric";
      }
    }
  }, []);

  return (
    <div className='mx-6' id='input-container'>
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          props.onChange(e);
        }}
        length={4}
        size='large'
      />
    </div>
  );
};