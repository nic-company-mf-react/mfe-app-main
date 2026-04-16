/** ExUseClientState1·2에서 동일한 슬라이스를 공유하기 위한 키 */
export const EXAMPLE_CLIENT_STATE_KEY = 'mfe-app-main/example/use-client-state/json-demo';

export type ExampleClientJsonState = {
	title: string;
	description: string;
	priority: 'low' | 'medium' | 'high';
	/** 저장 시각 (ISO 8601) */
	savedAt: string;
};
