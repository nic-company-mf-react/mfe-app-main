import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const baseUrl = env.VITE_BASE_URL || '/';

	return {
		base: baseUrl,
		plugins: [
			react(),
			tailwindcss(), // ← 추가
			federation({
				name: 'mainApp',
				dev: {
					disableDynamicRemoteTypeHints: true,
				},
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
					'@tanstack/react-query': { singleton: true, requiredVersion: '^5.95.2' },
					'react-helmet-async': { singleton: true, requiredVersion: '^3.0.0' },
					'@nic/mfe-lib-shared': { singleton: true, requiredVersion: '^0.0.0' },
				},
			}),
		],
		resolve: {
			dedupe: ['react', 'react-dom', 'react-router'],
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
		server: {
			port: 5173,
		},
	};
});
