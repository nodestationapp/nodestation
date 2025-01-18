const status_chip_colors = (status) => {
  switch (status) {
    //POST AND ORDERS STATUS
    case "active":
      return "green";
    case "inactive":
      return "red";

    default:
      return "";
  }
};

export default status_chip_colors;
