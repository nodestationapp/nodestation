import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AsideModal } from "@nstation/design-system";
import ReactJsonViewRaw from "@microlink/react-json-view";

// import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useColorScheme } from "@mui/material";

const ReactJsonView = ReactJsonViewRaw.default;

const value_render = ({ label, type, value, theme_mode }) => {
  switch (type) {
    case "short_text":
    case "enumeration":
    case "long_text":
    case "email":
      return <Typography>{value?.toString()}</Typography>;
    case "json":
      return (
        <ReactJsonView
          src={value}
          name={label}
          theme={theme_mode === "dark" ? "ocean" : "rjv-default"}
          enableClipboard={false}
          displayDataTypes={false}
          style={{ width: "100%" }}
          // shouldCollapse={({ src }) => {
          //   return typeof src === "object" && Object.keys(src).length > 6;
          // }}
        />
      );
    default:
      return "";
  }
};

const LogDetailsModal = ({ data, onClose }) => {
  const { mode } = useColorScheme();

  const details_data = [
    // {
    //   label: "General",
    //   icon: <InfoOutlineIcon sx={{ height: 20, width: 20 }} />,
    //   items: [
    //     {
    //       type: "short_text",
    //       label: "Request URL",
    //       value: data?.url,
    //     },
    //     {
    //       type: "short_text",
    //       label: "Method",
    //       value: data?.method,
    //     },
    //     {
    //       type: "short_text",
    //       label: "Status Code",
    //       value: data?.status,
    //     },
    //     {
    //       type: "short_text",
    //       label: "Response Time",
    //       value: `${data?.response_time} ms`,
    //     },
    //     {
    //       type: "short_text",
    //       label: "Date",
    //       value: moment?.unix(data?.created_at)?.format("DD MMM YYYY, hh:mm A"),
    //     },
    //   ],
    // },
    {
      // label: "Request",
      // icon: <TrendingDownIcon />,
      items: [
        {
          type: "json",
          label: "Body",
          value:
            typeof data?.message === "object" && data?.message !== null
              ? data?.message
              : { message: data?.message },
        },
        // {
        //   type: "json",
        //   label: "Headers",
        //   value: data?.headers,
        // },
      ],
    },
    // {
    //   label: "Response",
    //   icon: <TrendingUpIcon />,
    //   items: [
    //     {
    //       type: "json",
    //       label: "Body",
    //       value: data?.res || {},
    //     },
    //   ],
    // },
  ];

  return (
    <AsideModal header="Log details" onClose={onClose} width={500}>
      <Stack gap={2}>
        {details_data?.map((item, index) => (
          <Stack key={index} gap={1.5}>
            <Typography
              variant="body"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {item?.icon}
              {item?.label}
            </Typography>
            <Stack gap={1}>
              {item?.items?.map((element, index) => (
                <Stack
                  key={index}
                  direction="row"
                  gap={2}
                  justifyContent="space-between"
                >
                  {element?.type !== "json" && (
                    <Typography>{element?.label}</Typography>
                  )}
                  {value_render({
                    label: element?.label,
                    type: element?.type,
                    value: element?.value,
                    theme_mode: mode,
                  })}
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </AsideModal>
  );
};

export default LogDetailsModal;
