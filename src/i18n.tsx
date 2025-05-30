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
    - Founder of <Link href="https://u17g.com">Ubounded Pioneering.</Link><br />
    - Ex-Software Engineer at <Link href="https://plaid.co.jp">Plaid, Inc.</Link>
  </>
}

export const en: Localization = {
  lang: 'en',
  author: "Ryosuke Suzuki",
  title: "Ryosuke Suzuki",
  description: "I am Ryosuke Suzuki, a tech entrepreneur in Tokyo.",

  profileGreeting: "Hi",
  profileBody: "I am Ryosuke Suzuki, a tech entrepreneur in Tokyo.",

  belongings: belongings(),
};

export const ja: Localization = {
  lang: 'ja',
  author: "鈴木 凌介",
  title: "鈴木 凌介",
  description: "こんにちは、鈴木凌介です。",

  profileGreeting: "こんにちは",
  profileBody: "こんにちは、鈴木凌介です。起業家です。",

  belongings: belongings(),
};
