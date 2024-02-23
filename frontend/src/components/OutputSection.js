import React from 'react';

const OutputSection = ({ output }) => {
  return (
    <div className=' flex flex-col w-full'>
      <h2 className='text-3xl font-semibold'>Output:</h2>
      <pre className='border min-h-40 '>{output}</pre>
    </div>
  );
};

export default OutputSection;
