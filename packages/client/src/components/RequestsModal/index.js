import "./styles.scss";

import Modal from "components/Modal";
import RequestExample from "components/RequestExample";

const mainClass = "request-modal";

const RequestsModal = ({ data, onClose }) => {
  return (
    <Modal header="Form endpoints" onClose={onClose} hide_action>
      <div className={mainClass}>
        {data?.map((item, index) => (
          <div key={index} className={`${mainClass}__item`}>
            <span>{item?.label}</span>
            <RequestExample method="post" url={item?.url} body={item?.body} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default RequestsModal;
