import { Component, type ErrorInfo, type ReactNode } from 'react';

interface RemoteErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface RemoteErrorBoundaryPropsState {
  hasError: boolean;
}

export default class RemoteErrorBoundary extends Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryPropsState> {
  state: RemoteErrorBoundaryPropsState = { hasError: false };

  static getDerivedStateFromError(): RemoteErrorBoundaryPropsState {
    return { hasError: true };
  }

	componentDidCatch(error: Error, info: ErrorInfo) {
    // 에러 로깅 (선택)
    console.error('[RemoteErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

//-----------------------------------------------------------------

// 현재 RemoteErrorBoundary 컴포넌트는 클래스 컴포넌트로 구현되어야 합니다.
/*
핵심 이유: React의 에러 캐치 메커니즘
React에서 Error Boundary가 동작하려면 두 가지 생명주기 메서드가 필요합니다:
static getDerivedStateFromError(error) — 렌더링 중 에러 발생 시 state를 업데이트
componentDidCatch(error, info) — 에러 로깅 등 사이드 이펙트 처리
이 두 메서드는 클래스 컴포넌트의 생명주기 메서드이며, 현재(2026년 기준)까지도 함수형 컴포넌트에는 이에 대응하는 Hook이 존재하지 않습니다.
*/
//import { useState, type ReactNode } from 'react';

//interface RemoteErrorBoundaryProps {
//	children: React.ReactNode;
//	fallback: React.ReactNode;
//}

//export default function RemoteErrorBoundary({ fallback, children }: RemoteErrorBoundaryProps): ReactNode {
//	const [hasError, setHasError] = useState(false);

//	if (hasError) {
//		return fallback;
//	}
//	return children;
//}