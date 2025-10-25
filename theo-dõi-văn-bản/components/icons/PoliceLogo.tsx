import React from 'react';

const PoliceLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    {...props}
  >
    <defs>
      <style>
        {
          '.cls-1{fill:#f0f0f0}.cls-2{fill:#d80027}.cls-3{fill:#ffda44}'
        }
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <path
            className="cls-2"
            d="M175.2,123.4l-1.3-3.9a79.22,79.22,0,0,1-13.8,17.2l-3.3,2.6a81.82,81.82,0,0,1-113.6,0l-3.3-2.6a79.22,79.22,0,0,1-13.8-17.2l-1.3,3.9c-1,3.2-1.2,6.8.2,10.7a81.7,81.7,0,0,0,149-1.9C176.4,130.2,176.2,126.6,175.2,123.4Z"
          />
          <path
            className="cls-3"
            d="M100,21.5A78.5,78.5,0,0,0,21.5,100c0,21.1,8.3,40.2,21.8,54.1l3.3,2.6a81.82,81.82,0,0,0,113.6,0l3.3-2.6C176.7,140.2,185,121.1,185,100A78.5,78.5,0,0,0,100,21.5Z"
          />
          <path
            className="cls-2"
            d="M100,32.3A67.7,67.7,0,1,0,167.7,100,67.78,67.78,0,0,0,100,32.3Z"
          />
          <polygon
            className="cls-3"
            points="100 48.6 109.1 76.8 139.7 76.8 115.3 94.3 124.4 122.5 100 105 75.6 122.5 84.7 94.3 60.3 76.8 90.9 76.8 100 48.6"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default PoliceLogo;
