// import "../styles.scss";
import Box from "@mui/material/Box";

import ReactJsonViewRaw from "@microlink/react-json-view";
import { useColorScheme } from "@mui/material";
const ReactJsonView = ReactJsonViewRaw.default;

const Json = ({ data }) => {
  const { mode } = useColorScheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <ReactJsonView
        name={null}
        theme={mode === "dark" ? "ocean" : "rjv-default"}
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
