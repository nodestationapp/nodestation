import { spawn } from "child_process";

const runCommand = async ({ cmd, args = [], __dirname, quiet, env }) => {
  try {
    const nodeProcess = spawn(cmd, args, {
      cwd: __dirname,
      stdio: quiet ? "ignore" : "inherit",
      shell: true,
      env: {
        ...process.env,
        ...env,
      },
    });

    await new Promise((resolve, reject) => {
      nodeProcess.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Proces zakończył się z kodem: ${code}`));
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
