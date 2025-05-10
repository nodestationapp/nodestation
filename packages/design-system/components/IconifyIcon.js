import { Icon } from "@iconify/react";

const IconifyIcon = ({ icon, ...rest }) => {
  return <Icon icon={icon} height={17} width={17} {...rest} />;
};

export default IconifyIcon;
