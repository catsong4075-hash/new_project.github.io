# Kiro 한국어 설정 가이드

이 문서는 Kiro UI 라이브러리의 한국어 설정 방법을 설명합니다.

## 📋 목차

1. [설치 및 기본 설정](#설치-및-기본-설정)
2. [Provider 설정](#provider-설정)
3. [한국어 메시지 시스템](#한국어-메시지-시스템)
4. [날짜/시간 포맷팅](#날짜시간-포맷팅)
5. [입력 검증](#입력-검증)
6. [접근성 설정](#접근성-설정)
7. [컴포넌트 사용법](#컴포넌트-사용법)
8. [테스트](#테스트)

## 🚀 설치 및 기본 설정

### 1. Kiro 설치
```bash
npm install kiro
```

### 2. Provider 설정
`App.jsx`에 KiroProvider를 추가합니다:

```jsx
import { KiroProvider } from './contexts/KiroProvider'

function App() {
  return (
    <KiroProvider>
      {/* 기존 컴포넌트들 */}
    </KiroProvider>
  )
}
```

## 🔧 Provider 설정

### KiroProvider 구조
```jsx
// contexts/KiroProvider.jsx
export const KiroProvider = ({ children }) => {
  const value = {
    locale: 'ko-KR',
    messages: koreanMessages,
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    currency: 'KRW',
    timezone: 'Asia/Seoul',
  };

  return (
    <KiroContext.Provider value={value}>
      {children}
    </KiroContext.Provider>
  );
};
```

## 📝 한국어 메시지 시스템

### 메시지 구조
```javascript
const koreanMessages = {
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다.',
    success: '성공적으로 처리되었습니다.',
    // ...
  },
  luck: {
    title: '오늘의 행운지수',
    subtitle: '사주를 기반으로 나만의 행운 점수와 행운 강화법을 알려드려요.',
    // ...
  },
  labels: {
    name: '이름',
    birthDate: '생년월일',
    // ...
  },
  // ...
};
```

### 메시지 사용법
```jsx
import { useKiro, getMessage } from '../contexts/KiroProvider'

function MyComponent() {
  const { locale } = useKiro()
  
  return (
    <div>
      <h1>{getMessage('luck.title')}</h1>
      <p>{getMessage('luck.subtitle')}</p>
      <button>{getMessage('common.confirm')}</button>
    </div>
  )
}
```

## 📅 날짜/시간 포맷팅

### 사용 가능한 함수들
```javascript
import { 
  formatKoreanDate, 
  formatKoreanTime, 
  formatKoreanNumber, 
  formatKoreanCurrency,
  formatKoreanRelativeTime 
} from '../utils/kiroConfig'

// 한국어 날짜 포맷팅
formatKoreanDate(new Date()) // "2024년 1월 15일 월요일"

// 한국어 시간 포맷팅
formatKoreanTime(new Date()) // "14:30"

// 한국어 숫자 포맷팅
formatKoreanNumber(1234567) // "1,234,567"

// 한국어 통화 포맷팅
formatKoreanCurrency(50000) // "₩50,000"

// 상대적 시간 표시
formatKoreanRelativeTime(new Date()) // "방금 전"
```

## ✅ 입력 검증

### 한국어 입력 검증 함수들
```javascript
import { validateKoreanInput } from '../utils/kiroConfig'

// 한글 이름 검증 (2-10자)
validateKoreanInput.koreanName('김철수') // true

// 한국 전화번호 검증
validateKoreanInput.koreanPhone('010-1234-5678') // true

// 한국 우편번호 검증
validateKoreanInput.koreanPostalCode('12345') // true
```

### 컴포넌트에서 사용
```jsx
<InputField
  label="이름"
  value={name}
  onChange={setName}
  validateKorean
  context="name"
  error={nameError}
/>
```

## ♿ 접근성 설정

### 스크린 리더 지원
```javascript
import { koreanAccessibility } from '../utils/kiroConfig'

// 스크린 리더용 라벨 생성
koreanAccessibility.getScreenReaderLabel('button', 'submit') // "제출 버튼"
koreanAccessibility.getScreenReaderLabel('input', 'name') // "이름 입력 필드"
```

### 키보드 단축키
```javascript
const shortcuts = koreanAccessibility.getKeyboardShortcuts()
// {
//   submit: 'Enter',
//   cancel: 'Escape',
//   search: 'Ctrl + K',
//   // ...
// }
```

## 🧩 컴포넌트 사용법

### Button 컴포넌트
```jsx
import Button from '../components/common/Button'

// 기본 사용법
<Button context="submit">제출</Button>

// 접근성 라벨 포함
<Button 
  context="submit" 
  ariaLabel="폼 제출 버튼"
>
  제출
</Button>
```

### InputField 컴포넌트
```jsx
import InputField from '../components/common/InputField'

// 기본 사용법
<InputField
  label="이름"
  value={name}
  onChange={setName}
  required
/>

// 한국어 검증 포함
<InputField
  label="이름"
  value={name}
  onChange={setName}
  validateKorean
  context="name"
  error={nameError}
/>
```

## 🧪 테스트

### 테스트 페이지 접근
브라우저에서 `/kiro-test` 경로로 접근하여 모든 한국어 설정을 테스트할 수 있습니다.

### 테스트 항목
1. **메시지 테스트**: 모든 한국어 메시지 표시 확인
2. **날짜/시간 포맷팅**: 한국어 형식으로 날짜/시간 표시
3. **복수형 및 호칭**: 한국어 문법에 맞는 복수형과 호칭 처리
4. **폼 테스트**: 한국어 입력 검증 및 에러 메시지
5. **접근성 테스트**: 스크린 리더 지원 확인

## 📁 파일 구조

```
frontend/
├── src/
│   ├── contexts/
│   │   └── KiroProvider.jsx          # 한국어 Provider
│   ├── utils/
│   │   └── kiroConfig.js             # 한국어 설정 유틸리티
│   ├── components/
│   │   └── common/
│   │       ├── Button.jsx            # 한국어 지원 버튼
│   │       └── InputField.jsx        # 한국어 지원 입력 필드
│   └── pages/
│       └── KiroTestPage.jsx          # 테스트 페이지
└── KIRO_KOREAN_SETUP.md              # 이 문서
```

## 🔄 로케일 변경

### 다른 언어로 변경
```jsx
// KiroProvider에서 locale 변경
const value = {
  locale: 'en-US', // 영어로 변경
  messages: englishMessages,
  // ...
};
```

### 동적 로케일 변경
```jsx
import { useKiro } from '../contexts/KiroProvider'

function LanguageSwitcher() {
  const { locale, setLocale } = useKiro()
  
  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="ko-KR">한국어</option>
      <option value="en-US">English</option>
    </select>
  )
}
```

## 🐛 문제 해결

### 일반적인 문제들

1. **메시지가 표시되지 않는 경우**
   - `KiroProvider`가 올바르게 설정되었는지 확인
   - `getMessage` 함수의 경로가 정확한지 확인

2. **한글 입력이 제대로 처리되지 않는 경우**
   - `validateKorean` prop이 설정되었는지 확인
   - `context` prop이 올바르게 설정되었는지 확인

3. **접근성이 작동하지 않는 경우**
   - `aria-label` 속성이 올바르게 설정되었는지 확인
   - 스크린 리더 테스트 도구 사용

## 📚 추가 리소스

- [Kiro 공식 문서](https://kiro.dev)
- [한국어 접근성 가이드](https://www.w3.org/WAI/WCAG21/quickref/)
- [한국어 날짜/시간 포맷팅](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

## 🤝 기여하기

한국어 설정 개선에 기여하고 싶으시다면:

1. 새로운 메시지 추가
2. 한국어 입력 검증 로직 개선
3. 접근성 기능 추가
4. 문서 개선

모든 기여는 환영합니다! 