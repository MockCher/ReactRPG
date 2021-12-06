import { useState, useEffect } from "react";

const Map = ({ children, map, tile_size }) => {
  const [size, setSize] = useState({
    w: `${window.innerWidth - (window.innerWidth % tile_size)}px`,
    h: `${window.innerHeight - (window.innerHeight % tile_size)}px`
  });
  const [borders, setBorders] = useState({
    b: window.innerHeight % tile_size,
    r: window.innerWidth % tile_size
  });
  useEffect(() => {
    window.addEventListener("resize", resizeMap);
    return () => window.removeEventListener("resize", resizeMap);
  }, []);

  const resizeMap = () => {
    setSize({
      h: window.innerHeight - (window.innerHeight % tile_size),
      w: window.innerWidth - (window.innerWidth % tile_size)
    });
    setBorders({
      b: window.innerHeight % tile_size,
      r: window.innerWidth % tile_size
    });
  };

  return (
    <div
      style={{
        height: size.h,
        width: size.w,
        // backgroundImage: `url(${map})`,
        // backgroundSize: "800%",
        // backgroundPosition: `-${1570}px -${490}px`,
        imageRendering: "pixelated",
        // backgroundColor:  "green",
        borderBottom: `${borders.b}px solid black`,
        borderRight: `${borders.r}px solid black`
      }}
      className="checkerBoard"
    >
      {children}
    </div>
  );
};

export default Map;
