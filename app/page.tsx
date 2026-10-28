'use client';

import { useState } from 'react'; // useEffect는 삭제해도 됩니다.
import { motion } from 'framer-motion';
import fortunes from './data.json';

export default function Home() {
  const [result, setResult] = useState<{ title: string; desc: string } | null>(null);

  const handleDrawTarot = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setResult(fortunes[randomIndex]);
  };

  // 카카오톡 공유 기능 수정본
  const shareToKakao = () => {
    if (!result) return;
    
    const kakao = (window as any).Kakao;
    
    // 1. 카카오 스크립트 로드 확인
    if (!kakao) {
      alert('카카오 공유 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // 2. ★ 핵심: 공유 버튼을 누를 때 초기화 여부를 확인하고, 안 되어 있다면 여기서 초기화
    if (!kakao.isInitialized()) {
      kakao.init('315386572662ba0f47f4acfabfd897cf'); 
    }

    // 3. 공유 기능 실행
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: result.title,
        description: result.desc,
        imageUrl: 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png',
        link: {
          mobileWebUrl: 'https://bug-tarot.vercel.app',
          webUrl: 'https://bug-tarot.vercel.app',
        },
      },
      buttons: [
        {
          title: '내 타로 뽑아보기',
          link: {
            mobileWebUrl: 'https://bug-tarot.vercel.app',
            webUrl: 'https://bug-tarot.vercel.app',
          },
        },
      ],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">개발자 버그 타로 🃏</h1>
      
      <button 
        onClick={handleDrawTarot}
        className="px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-2xl shadow-lg hover:bg-gray-700 transition-all z-10 mb-8"
      >
        {result ? '다른 카드 뽑아보기' : '내 버그 타로 뽑기'}
      </button>

      {result && (
        <div style={{ perspective: 1000 }} className="flex flex-col items-center">
          <motion.div
            key={result.title}
            initial={{ rotateY: 180, scale: 0.5, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-gray-900 mb-6"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">{result.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.desc}</p>
          </motion.div>
          /*
          <button 
            onClick={shareToKakao}
            className="px-6 py-3 bg-[#FEE500] text-[#000000] font-bold rounded-xl shadow hover:bg-[#F4DC00] transition-all flex items-center gap-2"
          >
            카카오톡으로 결과 공유하기
          </button>*/
        </div>
      )}
    </main>
  );
}