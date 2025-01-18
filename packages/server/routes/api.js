import express from "express";
import { sendForm } from "#controllers/api.js";

const router = express.Router();

router.route("/system/forms/:id").post(sendForm);

export default router;
