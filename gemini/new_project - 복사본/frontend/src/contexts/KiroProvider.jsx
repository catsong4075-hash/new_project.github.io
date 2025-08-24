import React, { createContext, useContext } from 'react';

// 한국어 메시지 정의
const koreanMessages = {
  // 공통 메시지
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다.',
    success: '성공적으로 처리되었습니다.',
    cancel: '취소',
    confirm: '확인',
    close: '닫기',
    save: '저장',
    delete: '삭제',
    edit: '수정',
    add: '추가',
    search: '검색',
    filter: '필터',
    sort: '정렬',
    refresh: '새로고침',
    back: '뒤로',
    next: '다음',
    previous: '이전',
    submit: '제출',
    reset: '초기화',
  },
  
  // 폼 관련 메시지
  form: {
    required: '필수 입력 항목입니다.',
    invalid: '올바르지 않은 형식입니다.',
    minLength: '최소 {min}자 이상 입력해주세요.',
    maxLength: '최대 {max}자까지 입력 가능합니다.',
    email: '올바른 이메일 주소를 입력해주세요.',
    password: '비밀번호를 입력해주세요.',
    passwordConfirm: '비밀번호 확인을 입력해주세요.',
    passwordMismatch: '비밀번호가 일치하지 않습니다.',
    phone: '올바른 전화번호를 입력해주세요.',
    date: '올바른 날짜를 입력해주세요.',
    time: '올바른 시간을 입력해주세요.',
    number: '숫자를 입력해주세요.',
    url: '올바른 URL을 입력해주세요.',
  },
  
  // 행운지수 관련 메시지
  luck: {
    title: '오늘의 행운지수',
    subtitle: '사주를 기반으로 나만의 행운 점수와 행운 강화법을 알려드려요.',
    description: '매일 1분, 나를 위한 재미있는 루틴을 만들어보세요.',
    calculate: '오늘의 행운지수 확인하기',
    result: '행운지수 결과',
    score: '행운 점수',
    recommendation: '행운 강화 방법',
    share: '결과 공유하기',
    copy: '복사하기',
    shareSuccess: '결과가 복사되었습니다!',
    shareError: '공유하기에 실패했습니다.',
  },
  
  // 입력 필드 라벨
  labels: {
    name: '이름',
    birthDate: '생년월일',
    birthTime: '태어난 시간',
    unknownTime: '모름',
    email: '이메일',
    phone: '전화번호',
    message: '메시지',
    comment: '댓글',
    description: '설명',
    title: '제목',
    content: '내용',
    category: '카테고리',
    tags: '태그',
  },
  
  // 플레이스홀더
  placeholders: {
    name: '이름을 입력해주세요',
    birthDate: '생년월일을 선택해주세요',
    birthTime: '태어난 시간을 선택해주세요',
    email: '이메일을 입력해주세요',
    phone: '전화번호를 입력해주세요',
    message: '메시지를 입력해주세요',
    search: '검색어를 입력해주세요',
    comment: '댓글을 입력해주세요',
    title: '제목을 입력해주세요',
    content: '내용을 입력해주세요',
  },
  
  // 유효성 검사 메시지
  validation: {
    nameRequired: '이름을 입력해주세요.',
    birthDateRequired: '생년월일을 입력해주세요.',
    birthTimeRequired: '태어난 시간을 입력해주세요.',
    emailRequired: '이메일을 입력해주세요.',
    phoneRequired: '전화번호를 입력해주세요.',
    messageRequired: '메시지를 입력해주세요.',
    titleRequired: '제목을 입력해주세요.',
    contentRequired: '내용을 입력해주세요.',
  },
  
  // 알림 메시지
  notifications: {
    info: '정보',
    warning: '경고',
    error: '오류',
    success: '성공',
    question: '질문',
  },
  
  // 페이지 제목
  pages: {
    home: '홈',
    about: '소개',
    contact: '연락처',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    help: '도움말',
    settings: '설정',
    profile: '프로필',
    login: '로그인',
    register: '회원가입',
    logout: '로그아웃',
  },
};

// Kiro 컨텍스트 생성
const KiroContext = createContext();

// Kiro Provider 컴포넌트
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

// Kiro 훅
export const useKiro = () => {
  const context = useContext(KiroContext);
  if (!context) {
    throw new Error('useKiro must be used within a KiroProvider');
  }
  return context;
};

// 메시지 가져오기 헬퍼 함수
export const getMessage = (path, params = {}) => {
  const keys = path.split('.');
  let message = koreanMessages;
  
  for (const key of keys) {
    if (message && typeof message === 'object' && key in message) {
      message = message[key];
    } else {
      return path; // 키가 없으면 경로 자체를 반환
    }
  }
  
  if (typeof message === 'string') {
    // 파라미터 치환
    return message.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }
  
  return path;
};

export default KiroProvider; 