import './global.css';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { Localization } from '../../i18n';
import styles from './layout.module.css';
import Link from 'next/link';

const font = localFont({
  src: './Outfit-VariableFont_wght.ttf',
  fallback: ['メイリオ'],
  display: 'swap',
});

const Languages = () => {
  return <div className={styles.languages}>
    <Link href="/" className={styles.lang}>
      EN
    </Link>
    |
    <Link href="/ja" className={styles.lang}>
      JP
    </Link>
  </div>
}

export function createRootLayout(info: Localization) {
  return ({
    children
  }: { children: ReactNode }) => {
    return (
      <html lang={info.lang} className={font.className}>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={info.description} />
          <meta name="author" content={info.author} />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <title>{info.title}</title>
        </head>
        <body>
          <div className={styles.container}>
            <header className={styles.header}>
              <Link href="/" data-header>
                Ryosuke Suzuki
              </Link>
              <div className={styles.space} />
              {/* <Link href="/archive"> */}
              {/* <a data-menu>Archive</a> */}
              {/* </Link> */}
            </header>
            <div className={styles.body}>
              {children}
            </div>
            <footer className={styles.footer}>
              <small>Ⓒ Ryosuke Suzuki</small>
            </footer>
            <Languages />
          </div>
        </body>
      </html>
    )
  }
}
