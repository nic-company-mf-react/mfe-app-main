import { defineConfig, globalIgnores } from 'eslint/config';
import reactConfig from '@nic/mfe-lib-shared/config/eslint/react';
export default defineConfig([
	globalIgnores(['dist']),
	...reactConfig,
	// 이 프로젝트에만 적용할 추가 규칙이 있으면 여기에 추가
]);
