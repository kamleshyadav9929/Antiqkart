import React from "react";

// A large, soft, circular shape for the background of the Hero section
export const ShapeOne = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 backdrop-blur-sm"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-orange-200/50 rounded-full" />
  </div>
);

// A smaller, accent circle for the Hero section
export const ShapeTwo = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute bottom-[50px] left-[-100px] w-[250px] h-[250px] z-0 backdrop-blur-sm"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-yellow-100/60 rounded-full" />
  </div>
);

// A new shape for the middle sections of the page
export const ShapeThree = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute top-[100px] left-[-200px] w-[400px] h-[400px] z-0 backdrop-blur-sm"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-blue-100/50 rounded-full" />
  </div>
);

// A decorative line shape
export const ShapeFour = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute bottom-[200px] right-[-150px] w-[300px] h-[2px] z-0 backdrop-blur-sm"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-green-100/50" />
  </div>
);
