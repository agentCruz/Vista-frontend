import React, { useEffect, useState } from 'react';

const NFCReader = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const readNFC = async () => {
      if ('NDEFReader' in window) {
        try {
          const ndef = new window.NDEFReader();
          await ndef.scan();
          console.log("Scan started successfully.");
          ndef.onreading = event => {
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
              const text = decoder.decode(record.data);
              setMessage(text);
              processPayment(text); // Trigger payment process
            }
          };
        } catch (err) {
          console.error(`Error! Scan failed to start: ${err}.`);
          setError(`Error! Scan failed to start: ${err.message}`);
        }
      } else {
        console.warn('Web NFC is not supported in this browser.');
        setError('Web NFC is not supported in this browser.');
      }
    };

    readNFC();
  }, []);

  const processPayment = async (paymentInfo) => {
    try {
      const response = await fetch('http://localhost:3000/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentInfo }),
      });
      const result = await response.json();
      console.log(result.status);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };  

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{message ? `Message: ${message}` : 'Scan an NFC tag to proceed with payment'}</p>
      )}
    </div>
  );
};

export default NFCReader;
