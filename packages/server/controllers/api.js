import { knex } from "@nstation/db";
import { logger, fs, sendEmail } from "@nstation/utils";

const sendForm = async (req, res) => {
  let body = req?.body;
  const { id } = req?.params;

  try {
    const created_at = Date.now();

    const forms = fs.getFiles(["forms"]);
    const form = forms?.find((item) => item?.id?.toString() === id?.toString());

    if (req?.files?.length > 0) {
      req?.files?.forEach((item) => {
        body[item?.fieldname] = {
          name: item?.originalname,
          type: item?.mimetype,
          url: item?.path,
          size: item?.size,
        };
      });
    }

    const formatted_body = form?.fields.reduce((acc, curr) => {
      acc[curr.slug] = body?.[curr.slug];
      return acc;
    }, {});

    await knex("nodestation_forms")
      .insert({
        data: JSON.stringify(formatted_body),
        form_id: id,
        created_at,
      })
      .returning("id");

    if (!!form?.settings?.auto_responder?.active) {
      const email =
        formatted_body?.[form?.settings?.auto_responder?.email_field];

      if (!!email) {
        sendEmail(form?.settings?.auto_responder?.value, {
          recipients: [email],
          context: { ...formatted_body },
        });
      } else {
        const emails = fs.getFiles(["emails"]);
        const template = emails?.find(
          (item) => item?.id === form?.settings?.auto_responder?.value
        );

        logger({
          level: "warning",
          source: {
            type: "emails",
            name: template?.name,
          },
          message: `email_no_recipient`,
        });
      }
    }

    if (!!form?.settings?.send_email_admin?.active) {
      const admin_emails = await knex("nodestation_users")
        .where({ type: "admin" })
        .pluck("email");

      sendEmail(form?.settings?.send_email_admin?.value, {
        recipients: admin_emails,
        context: { ...formatted_body },
      });
    }

    req?.io?.emit("new_form_message");

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { sendForm };
