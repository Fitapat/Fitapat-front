/* eslint-disable consistent-return */

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// 기본 페이지
const FALLBACK_URL = '';

// 인증이 필요한 페이지인 경우
const withAuth = async (req, token) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // 인증이 안 된 상태라면
  if (!token) {
    // 스타트 페이지 또는 로그인 페이지를 쿼리스트링을 붙여서 리다이렉트
    if (pathname === '/') url.pathname = '/start';
    else url.pathname = '/login';
    url.search = `callbackUrl=${pathname}`;

    return NextResponse.redirect(url);
  }
};

// 인증이 필요없는 페이지인 경우
const withoutAuth = async (req, token, to) => {
  const url = req.nextUrl.clone();
  // const { pathname } = req.nextUrl;

  // 인증이 된 상태라면
  if (token) {
    // 기본 페이지로 리다이렉트
    url.pathname = to ?? FALLBACK_URL;
    url.search = '';

    return NextResponse.redirect(url);
  }
};

// 인증이 필요한 페이지 리스트
const withAuthList = ['/', '/user', '/selectpic', '/canvas', '/delete'];
// 인증이 필요없는 페이지 리스트
const withoutAuthList = ['/start', '/register', '/login', '/forgot', '/reset'];

export async function middleware(req) {
  const token = await getToken({ req });

  const { searchParams } = req.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl');
  const { pathname } = req.nextUrl;

  const isWithAuth = withAuthList.includes(pathname);
  const isWithoutAuth = withoutAuthList.includes(pathname);

  if (isWithAuth) return withAuth(req, !!token);
  if (isWithoutAuth) return withoutAuth(req, !!token, callbackUrl);
  return null;
}
