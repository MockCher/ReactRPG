export const StatusBar = ({ color = "grey", value = 100, maxvalue = 100 }) => {
  return (
    <div
      style={{
        height: "25px",
        width: `${maxvalue / 3}vw`,
        padding: "2px"
      }}
    >
      <div
        style={{
          backgroundColor: color,
          width: `${value / 3}vw`,
          height: "25px"
        }}
      ></div>
    </div>
  );
};
