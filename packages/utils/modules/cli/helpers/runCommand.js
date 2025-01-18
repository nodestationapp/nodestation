import { spawn } from "child_process";

const runCommand = async ({ cmd, args = [], __dirname, quiet }) => {
  try {
    const nodeProcess = spawn(cmd, args, {
      cwd: __dirname,
      stdio: quiet ? "ignore" : "inherit",
      shell: true,
    });

    await new Promise((resolve, reject) => {
      nodeProcess.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Process exit: ${code}`));
        }
      });

      nodeProcess.on("error", (err) => {
        reject(err);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export default runCommand;
