// Kiro 한국어 설정 유틸리티

// 한국어 날짜 포맷팅
export const formatKoreanDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(new Date(date));
};

// 한국어 시간 포맷팅
export const formatKoreanTime = (time) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(new Date(time));
};

// 한국어 숫자 포맷팅
export const formatKoreanNumber = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

// 한국어 통화 포맷팅
export const formatKoreanCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};

// 한국어 상대적 시간 표시
export const formatKoreanRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    return formatKoreanDate(date);
  }
};

// 한국어 복수형 처리
export const getKoreanPlural = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};

// 한국어 성별에 따른 호칭
export const getKoreanHonorific = (name, gender = 'unknown') => {
  const honorifics = {
    male: '님',
    female: '님',
    unknown: '님'
  };
  return `${name}${honorifics[gender]}`;
};

// 한국어 입력 검증
export const validateKoreanInput = {
  // 한글 이름 검증 (2-10자)
  koreanName: (value) => {
    const koreanNameRegex = /^[가-힣]{2,10}$/;
    return koreanNameRegex.test(value);
  },
  
  // 한국 전화번호 검증
  koreanPhone: (value) => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  },
  
  // 한국 우편번호 검증
  koreanPostalCode: (value) => {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(value);
  },
  
  // 한국 주민등록번호 검증 (마스킹된 형태)
  koreanResidentNumber: (value) => {
    const residentNumberRegex = /^\d{6}-\d{7}$/;
    return residentNumberRegex.test(value);
  }
};

// 한국어 키보드 이벤트 처리
export const handleKoreanKeyboard = (event) => {
  // 한글 입력 중일 때 특별 처리
  if (event.isComposing) {
    return;
  }
  
  // 특수 키 처리
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      // 엔터 키 처리 로직
      break;
    case 'Escape':
      event.preventDefault();
      // ESC 키 처리 로직
      break;
    default:
      break;
  }
};

// 한국어 접근성 설정
export const koreanAccessibility = {
  // 스크린 리더용 한국어 라벨
  getScreenReaderLabel: (element, context) => {
    const labels = {
      button: {
        submit: '제출 버튼',
        cancel: '취소 버튼',
        close: '닫기 버튼',
        save: '저장 버튼',
        delete: '삭제 버튼',
        edit: '수정 버튼',
        add: '추가 버튼',
        search: '검색 버튼',
        filter: '필터 버튼',
        sort: '정렬 버튼',
        refresh: '새로고침 버튼',
        back: '뒤로 가기 버튼',
        next: '다음 버튼',
        previous: '이전 버튼'
      },
      input: {
        text: '텍스트 입력 필드',
        email: '이메일 입력 필드',
        password: '비밀번호 입력 필드',
        number: '숫자 입력 필드',
        date: '날짜 선택 필드',
        time: '시간 선택 필드',
        search: '검색어 입력 필드'
      },
      link: {
        home: '홈으로 이동',
        about: '소개 페이지로 이동',
        contact: '연락처 페이지로 이동',
        help: '도움말 페이지로 이동',
        settings: '설정 페이지로 이동',
        profile: '프로필 페이지로 이동'
      }
    };
    
    return labels[element]?.[context] || `${context} ${element}`;
  },
  
  // 한국어 키보드 단축키
  getKeyboardShortcuts: () => ({
    submit: 'Enter',
    cancel: 'Escape',
    search: 'Ctrl + K',
    refresh: 'F5',
    back: 'Alt + ←',
    forward: 'Alt + →',
    home: 'Alt + Home',
    help: 'F1'
  })
};

// 한국어 로케일 설정
export const koreanLocale = {
  locale: 'ko-KR',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm',
  currency: 'KRW',
  timezone: 'Asia/Seoul',
  numberFormat: {
    decimal: '.',
    thousands: ',',
    precision: 2
  },
  dateTimeFormat: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }
  }
};

export default {
  formatKoreanDate,
  formatKoreanTime,
  formatKoreanNumber,
  formatKoreanCurrency,
  formatKoreanRelativeTime,
  getKoreanPlural,
  getKoreanHonorific,
  validateKoreanInput,
  handleKoreanKeyboard,
  koreanAccessibility,
  koreanLocale
}; 