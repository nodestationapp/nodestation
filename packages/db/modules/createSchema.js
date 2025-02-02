import path from "path";
import fs_sys from "fs";
import { promises as fs_promise } from "fs";

import knex from "./knex.js";
import migration from "./migration/index.js";
import rootPath from "../../utils/modules/rootPath.js";
import createAuthFileIfNotExist from "./createAuthFileIfNotExist.js";

const createSqliteFileIfNotExist = async () => {
  const filePath = process.env.DATABASE_PATH;
  const dir = path.dirname(filePath);

  if (!!!fs_sys.existsSync(path.join(rootPath, dir))) {
    await fs_promise.mkdir(path.join(rootPath, dir), {
      recursive: true,
    });
  }

  const dbPath = path.join(rootPath, filePath);

  if (!!!fs_sys.existsSync(dbPath)) {
    await Promise.all([fs_promise.writeFile(dbPath, "", "utf8")]);
  }
};

const createSchema = async () => {
  if (process.env.DATABASE_CLIENT === "sqlite") {
    await createSqliteFileIfNotExist();
  }

  const formsTableExists = await knex.schema.hasTable("nodestation_forms");
  if (!formsTableExists) {
    await knex.schema.createTable("nodestation_forms", (table) => {
      table.increments("id").primary();
      table.string("data");
      table.integer("is_read").defaultTo(0);
      table.integer("archived").defaultTo(0);
      table.string("form_id");
      table.bigInteger("updated_at").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  const emailSettingsTableExists = await knex.schema.hasTable(
    "nodestation_email_settings"
  );
  if (!emailSettingsTableExists) {
    await knex.schema.createTable("nodestation_email_settings", (table) => {
      table.increments("id").primary();
      table.string("smtp").nullable();
      table.string("sendgrid").nullable();
      table.string("mailchimp").nullable();
      table.string("mailgun").nullable();
      table.string("aws").nullable();
      table.string("elastic").nullable();
      table.string("active").nullable();
    });
  }

  const mediaSettingsTableExists = await knex.schema.hasTable(
    "nodestation_media_settings"
  );
  if (!mediaSettingsTableExists) {
    await knex.schema.createTable("nodestation_media_settings", (table) => {
      table.increments("id").primary();
      table.string("aws").nullable();
      table.string("local").nullable();
      table.string("digitalocean").nullable();
      table.string("wasabi").nullable();
      table.string("active").nullable();
    });

    await knex("nodestation_media_settings").insert({
      active: "local",
    });
  }

  const mediaTableExists = await knex.schema.hasTable("nodestation_media");
  if (!mediaTableExists) {
    await knex.schema.createTable("nodestation_media", (table) => {
      table.increments("id").primary();
      table.string("name").nullable();
      table.integer("size").nullable();
      table.string("type").nullable();
      table.string("url").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  const logsTableExists = await knex.schema.hasTable("nodestation_logs");
  if (!logsTableExists) {
    await knex.schema.createTable("nodestation_logs", (table) => {
      table.increments("id").primary();
      table.string("level").nullable();
      table.string("source").nullable();
      table.text("message").nullable();
      table.text("req").nullable();
      table.text("res").nullable();
      table.integer("is_read").defaultTo(0);
      table.integer("responseTime").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  const emailActivationsTableExists = await knex.schema.hasTable(
    "nodestation_email_activations"
  );
  if (!emailActivationsTableExists) {
    await knex.schema.createTable("nodestation_email_activations", (table) => {
      table.increments("id").primary();
      table.string("uid").nullable();
      table.string("token").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  const passwordsResetTableExists = await knex.schema.hasTable(
    "nodestation_passwords_reset"
  );
  if (!passwordsResetTableExists) {
    await knex.schema.createTable("nodestation_passwords_reset", (table) => {
      table.increments("id").primary();
      table.string("uid").nullable();
      table.string("token").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  const savedPreferencesTableExists = await knex.schema.hasTable(
    "nodestation_preferences"
  );
  if (!savedPreferencesTableExists) {
    await knex.schema.createTable("nodestation_preferences", (table) => {
      table.increments("id").primary();
      table.string("uid").nullable();
      table.string("sort").nullable();
      table.string("content").nullable();
      table.string("table_id").nullable();
      table.bigInteger("updated_at").nullable();
      table.bigInteger("created_at").nullable();
    });
  }

  await createAuthFileIfNotExist();
  await migration();
};

export default createSchema;
