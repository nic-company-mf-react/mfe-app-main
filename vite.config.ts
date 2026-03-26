import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			tailwindcss(), // ← 추가
			federation({
				name: 'mainApp',
				remotes: {
					remote1App: {
						name: 'remote1App',
						entry: env.VITE_REMOTE_REMOTE1_URL || 'http://localhost:5174/remote1Entry.js',
						type: 'module',
					},
				},
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
	};
});
