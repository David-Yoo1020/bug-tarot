import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // 추가된 부분
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// 이 부분이 검색엔진과 카카오톡 크롤러가 읽어가는 정보입니다.
export const metadata: Metadata = {
  title: '개발자 버그 타로 🃏',
  description: '오늘 내 코드엔 어떤 재앙이? 직장인 생존 타로 보기',
  openGraph: {
    title: '개발자 버그 타로 🃏',
    description: '오늘 내 코드엔 어떤 재앙이? 직장인 생존 타로 보기',
    url: 'https://bug-tarot.vercel.app', // 나중에 배포된 실제 주소로 변경
    siteName: '개발자 버그 타로',
    images: [
      {
        url: '/og-image.png', // public 폴더에 넣은 이미지 경로
        width: 800,
        height: 400,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'z37HjTQQMpzzUY-gM6B86ZeGDJX1b12JApUUennv8nk',
    other: {
      'naver-site-verification': ['71b72a298bfa362b72f94d99683b887459bc07ec'],
    },
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        {/* 카카오 자바스크립트 SDK 추가 */}
        <Script 
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}