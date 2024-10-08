import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../Animation.json'; 

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
  //   <div className="animation-overlay">
  //     <div className="animation-container">
  //       <Lottie options={defaultOptions} height={200} width={200} />
  //     </div>
  //   </div>
  // );
  <div className="animation-overlay">
      <div className="animation-container">
        <div className="fixed inset-0 flex items-center w-[100vw] justify-center z-50 bg-opacity-50 bg-gray-700">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
        {/* <p>Loading...</p> */}
      </div>
    </div>
  );
};

export default LoadingAnimation;
