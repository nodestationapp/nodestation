import "./styles.scss";

const mainClass = "table__endpoint-code";

const color_render = (status) => {
  let color;

  if (status >= 100 && status <= 399) {
    color = "#009E77";
  } else if (status >= 400 && status <= 599) {
    color = "#F93F3E";
  }

  return color;
};

const EndpointCode = ({ data }) => {
  const color = color_render(data);

  return (
    <div className={mainClass} style={{ color }}>
      {data}
    </div>
  );
};

export default EndpointCode;
