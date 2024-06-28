#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

import { execSync } from "child_process";

const runCommand = (command) => {
    try {
        execSync(`${command}`, {});
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

async function main() {
    console.clear();

    await setTimeout(1000);

    p.intro(`${color.bgCyan(color.black(" create-open-backend "))}`);

    console.log("");
    console.log(
        "   ____                               ____                   _                         _ "
    );
    console.log(
        "  / __ \\                             |  _ \\                 | |                       | |"
    );
    console.log(
        " | |  | |  _ __     ___   _ __       | |_) |   __ _    ___  | | __   ___   _ __     __| |"
    );
    console.log(
        " | |  | | | '_ \\   / _ \\ | '_ \\      |  _ <   / _` |  / __| | |/ /  / _ \\ | '_ \\   / _` |"
    );
    console.log(
        " | |__| | | |_) | |  __/ | | | |     | |_) | | (_| | | (__  |   <  |  __/ | | | | | (_| |"
    );
    console.log(
        "  \\____/  | .__/   \\___| |_| |_|     |____/   \\__,_|  \\___| |_|\\_\\  \\___| |_| |_|  \\__,_|"
    );
    console.log(
        "          | |                                                                            "
    );
    console.log(
        "          |_|                                                                            "
    );
    console.log("");

    const project = await p.group(
        {
            path: () =>
                p.text({
                    message: "What is your project name?",
                    placeholder: " api-sparkling-solid",
                    validate: (value) => {
                        if (!value) return "Please enter a project name.";
                    },
                }),
            type: ({ results }) =>
                p.select({
                    message: `Pick a open-backend variation`,
                    initialValue: "ts_init",
                    maxItems: 5,
                    options: [
                        { value: "ts_init", label: "Typescript Starter" },
                        {
                            value: "ts_express",
                            label: "Express + Typescript",
                        },
                        {
                            value: "js_mongodb",
                            label: "Express + MongoDB + JavaScript",
                        },
                        {
                            value: "ts_mongodb_express",
                            label: "Express + MongoDB + Typescript",
                        },
                    ],
                }),
        },
        {
            onCancel: () => {
                p.cancel("Operation cancelled.");
                process.exit(0);
            },
        }
    );

    let gitCheckoutCommand;

    const s = p.spinner();
    s.start("Cloning the template");
    await setTimeout(2500);
    if (project.type == "ts_init") {
        gitCheckoutCommand = `git clone --depth 1  https://github.com/vishva-kalhara/node-ts-.git ${project.path}`;
    } else if (project.type == "ts_express") {
        gitCheckoutCommand = `git clone --depth 1  https://github.com/vishva-kalhara/node-ts-starter.git ${project.path}`;
    } else if (project.type == "js_mongodb") {
        gitCheckoutCommand = `git clone --depth 1  https://github.com/vishva-kalhara/open-backend-express-mongodb.git ${project.path}`;
    } else if (project.type == "ts_mongodb_express") {
        gitCheckoutCommand = `git clone --depth 1  https://github.com/vishva-kalhara/express-mongodb-ts.git ${project.path}`;
    }

    const checkedOut = runCommand(gitCheckoutCommand);
    if (!checkedOut) process.exit(-1);

    console.log("");

    s.stop("Cloning completed!");

    let nextSteps = `cd ${project.path} \nnpm install \nnpm start`;

    p.note(nextSteps, "Next steps.");

    p.outro(
        `Developed By ${color.underline(
            color.cyan("https://github.com/vishva-kalhara")
        )}`
    );
}

main().catch(console.error);
