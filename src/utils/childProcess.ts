// Example code to run Terraform script from Node API using Makefile
// import { spawn } from "child_process";

// export default class ChildProcess {
//   spawnAsync(cmd: string, args: string[]) {
//     return new Promise((resolve, reject) => {
//       const process = spawn(cmd, args);

//       let stdout = "";
//       let stderr = "";

//       process.stdout.on("data", (data) => {
//         stdout += data;
//       });

//       process.stderr.on("data", (data) => {
//         stderr += data;
//       });

//       process.on("error", (error) => {
//         reject(error);
//       });

//       process.on("close", (code) => {
//         if (code !== 0) {
//           reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
//         } else {
//           resolve(stdout);
//         }
//       });
//     });
//   }
// }
