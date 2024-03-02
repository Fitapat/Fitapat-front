export { default } from 'next-auth/middleware';

// 로그인한 상태에만 볼 수 있는 페이지 추가
export const config = {
  matcher: ['/delete'],
};
