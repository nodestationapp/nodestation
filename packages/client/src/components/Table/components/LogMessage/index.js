const mainClass = "table__log-message";

const messageRender = (data) => {
  switch (data?.message) {
    case "form_success":
      return "Form message received";
    case "form_failed":
      return "Form submission failed";
    case "login_success":
      return `User logged in: ${data?.req?.body?.email}`;
    case "login_failed":
      return `Failed login attempt: ${data?.req?.body?.email}`;
    case "email_no_recipient":
      return "Email not sent: No recipients provided";
    case "email_message_sent":
      return `Email message sent to: ${data?.res?.body?.recipients?.join(
        ", "
      )}`;
    default:
      return JSON.stringify(data?.req?.body);
  }
};

const LogMessage = ({ data }) => {
  const message = messageRender(data);

  return (
    <div className={mainClass}>
      <span>{message}</span>
    </div>
  );
};

export default LogMessage;
