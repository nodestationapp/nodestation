import "../styles.scss";
import Box from "@mui/material/Box";

import ReactJsonViewRaw from "@microlink/react-json-view";
const ReactJsonView = ReactJsonViewRaw.default;

const Json = ({ data }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <ReactJsonView
        name={null}
        theme="ocean"
        collapsed={true}
        enableClipboard={false}
        displayDataTypes={false}
        src={data || {}}
        style={{
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default Json;
