import "./styles.scss";

import { ToastContainer, Slide } from "react-toastify";

const NotifyContainer = () => {
  return (
    <ToastContainer
      position={"bottom-right"}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
};

export default NotifyContainer;
