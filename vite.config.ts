import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(), // ← 추가
		federation({
			name: 'mfe-app-main',
			//remotes: {
			//  mfe_docs: 'http://localhost:5174/mf-manifest.json',
			//},
			shared: {
				react: { singleton: true, requiredVersion: '^19.0.0' },
				'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
				'react-router': { singleton: true, requiredVersion: '^7.0.0' },
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5173,
	},
});
