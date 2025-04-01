import fs from "fs";
import path from "path";
import { rootPath } from "@nstation/utils";
import nstationConfig from "../../../../nstation.config.js";

class PluginManager {
  constructor() {
    this.backendPlugins = [];
    this.frontendPlugins = [];
    this.pluginsDir = path.resolve(rootPath, "plugins");
  }

  loadPlugins() {
    // if (!fs.existsSync(this.pluginsDir)) return;

    // const read_js_file = fs.readFileSync(
    //   path.resolve(rootPath, "nstation.config.js"),
    //   "utf8"
    // );

    // let pluginsList = await import(path.join(rootPath, "nstation.config.js"));
    let pluginsList = nstationConfig();
    pluginsList = Object.keys(pluginsList).map((key) => ({
      key,
      ...pluginsList[key],
      resolve: path.join(rootPath, pluginsList[key].resolve),
    }));

    pluginsList.forEach((plugin) => {
      if (!fs.statSync(plugin?.resolve).isDirectory()) return;

      this.loadBackendPlugin(plugin);
      this.loadFrontendPlugin(plugin);
    });
  }

  loadBackendPlugin(plugin) {
    this.backendPlugins.push(plugin);
    console.log(`✅ Registered backend: ${plugin?.resolve}`);
  }

  loadFrontendPlugin(plugin) {
    const frontendFile = path.join(plugin?.resolve, "frontend.jsx");
    if (fs.existsSync(frontendFile)) {
      if (fs.existsSync(frontendFile)) {
        this.frontendPlugins.push(frontendFile);
        console.log(`✅ Registered frontend: ${frontendFile}`);
      }
    }
  }

  getFrontendPlugins() {
    return this.frontendPlugins;
  }

  getBackendPlugins() {
    return this.backendPlugins;
  }
}

export default PluginManager;
