import Image from "next/image";
import hero from './hero.png';
import { Localization } from '../../i18n';
import styles from './page.module.css';
import Link from "next/link";

const Icon = ({ src, href }: { src: string; href: string }) => {
  return (
    <Link href={href}>
      <Image alt="icon" layout="intrinsic" src={src} width="24" height="24" data-icon />
    </Link>
  );
};

export function createPage(info: Localization) {
  return () => {
    return <div>
      <div className={styles.hero} data-filter>
        <Image
          src={hero}
          alt={info.author}
          loading="lazy"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 data-title>{info.profileGreeting}</h1>
      <p>{info.profileBody}</p>

      <p>
        {info.belongings}
      </p>

      <ul>
        <li>
          <Link href="https://www.linkedin.com/in/ryosuke-suzuki">linkedin.com</Link>
        </li>
        <li>
          <Link href="https://x.com/ryosukecla">x.com</Link>
        </li>
        <li>
          <Link href="https://github.com/RyosukeCla">github.com</Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/ryosuke.suzuki">facebook.com</Link>
        </li>
      </ul>

      {/* <h4>Recently</h4> */}
      {/* <Docs docs={props.docs} />
      {props.hasMore && <p><Link href="/archive">
        <a data-menu>... more</a>
      </Link></p>} */}
    </div>
  }
}
