import * as esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cjsPath = path.resolve(__dirname, '..', 'dist', 'cjs');
const libPath = path.resolve(__dirname, '..', 'lib');

async function buildCjs() {
    const entryPoints = [path.join(libPath, 'index.js')];

    await esbuild.build({ bundle: true, entryPoints, format: 'cjs', outdir: cjsPath, platform: 'node' });

    const cjsPackageJson = JSON.stringify({ type: 'commonjs' }, null, 2);

    await fs.writeFile(path.join(cjsPath, 'package.json'), cjsPackageJson);
}

async function copyTypes() {
    const files = await fs.readdir(libPath);
    const types = files.filter((file) => file.endsWith('.d.ts'));

    await Promise.all(types.map((type) => fs.cp(path.join(libPath, type), path.join(cjsPath, type))));
}

await fs.mkdir(cjsPath, { recursive: true });

await buildCjs();

await copyTypes();
