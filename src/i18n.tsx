import Link from 'next/link';
import { ReactNode } from 'react';

export type Localization = {
  lang: 'en' | 'ja';
  author: string;
  title: string;
  description: string;

  profileGreeting: string;
  profileBody: string;

  belongings: ReactNode;
}


const belongings = () => {
  return <>
    - Co-Founder / Co-CEO of <Link href="https://yeyinc.com">Yey Algorithm, Inc.</Link><br />
    - Ex-Software Engineer at <Link href="https://plaid.co.jp">Plaid, Inc.</Link>
  </>
}

export const en: Localization = {
  lang: 'en',
  author: "Ryosuke Suzuki",
  title: "Ryosuke Suzuki",
  description: "I am Ryosuke Suzuki, a tech entrepreneur in Tokyo. I am passionate about creating something that makes the world a better place.",

  profileGreeting: "Hello!",
  profileBody: "I am Ryosuke Suzuki, a tech entrepreneur in Tokyo, born in 1996, finished a degree of mathematics, and loving singing✌️",

  belongings: belongings(),
};

export const ja: Localization = {
  lang: 'ja',
  author: "鈴木 凌介",
  title: "鈴木 凌介",
  description: "私は日本のテック起業家、鈴木凌介です。世界をより良い場所にする何かを創造することに情熱を持っています。",

  profileGreeting: "こんにちは！",
  profileBody: "こんにちは、鈴木 凌介 (スズキ リョウスケ)です。1996年生まれ、数学の学位を取得し、歌うことが大好きな、テック起業家です✌️",

  belongings: belongings(),
};
