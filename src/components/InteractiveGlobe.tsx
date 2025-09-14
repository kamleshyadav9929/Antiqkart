import React from "react";
import Globe from "react-globe.gl";

const InteractiveGlobe = () => {
  return (
    <div className="relative flex justify-center items-center h-[500px] md:h-[700px]">
      <div className="absolute inset-0 z-0">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          width={800}
          height={800}
          globeMaterial={{
            transparent: true,
            opacity: 0.9,
          }}
          atmosphereColor={"#FFFFFF"}
          atmosphereAltitude={0.15}
        />
      </div>
      <div className="relative z-10 text-center pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-text">
          Explore the Heart of India
        </h2>
        <p className="mt-4 text-muted max-w-lg">
          Click and drag the globe to explore. Hover over India to discover the
          rich heritage of each state.
        </p>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
