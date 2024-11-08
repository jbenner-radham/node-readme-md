import { $ } from 'execa';
import chalk from 'chalk';
import commandExists from 'command-exists';
import logSymbols from 'log-symbols';
import process from 'node:process';

if (!commandExists.sync('act')) {
    console.error(
        logSymbols.error,
        chalk.red(`The ${chalk.bold('act')} binary was not found. Please resolve this issue and try again.`)
    );
    process.exit(1);
}

await $({ stdout: 'inherit' })`act`;
