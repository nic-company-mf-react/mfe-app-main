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
		// @axiom/mfe-lib-shared 청크가 내부적으로 react-i18next, i18next를 import하므로
		// Rolldown이 이들을 번들링할 때 식별자 minify 버그로 `import { t } from 'react'`를
		// 생성합니다. MF shared 또는 peer dep으로 사용되는 패키지는 exclude 처리합니다.
		optimizeDeps: {
			exclude: ['@axiom/mfe-lib-shared', 'react-i18next', 'i18next'],
		},
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
					'@tanstack/react-query': { singleton: true, requiredVersion: '^5.96.2' },
					'react-helmet-async': { singleton: true, requiredVersion: '^3.0.0' },
					'@axiom/mfe-lib-shared': { singleton: true, requiredVersion: '^0.0.0' },
					i18next: { singleton: true, requiredVersion: '^26.0.0' },
					'react-i18next': { singleton: true, requiredVersion: '^17.0.0' },
					zustand: {
						singleton: true,
						requiredVersion: '^5.0.0', // package.json과 맞춤
					},
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
