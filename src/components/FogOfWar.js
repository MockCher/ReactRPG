export const FogOfWar = ({ clearX, clearY }) => {
  return (
    <div
      className="fog-of-war"
      style={{
        WebkitMaskPosition: `${clearX}px ${clearY}px`
      }}
    ></div>
  );
};
