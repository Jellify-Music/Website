import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans ">
      <main id="centered">
        <Image
          className="dark:invert"
          src="/jellifyBlack.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          id="pic"
        />
        <p className="font-mono text-sm/6 text-center">
          Website Under Construction...
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.cosmonautical.jellify"
          className="font-mono text-sm/6 text-center first-link"
        >
          Play Store
        </a>
        <a
          href="https://apps.apple.com/us/app/jellify/id6736884612"
          className="font-mono text-sm/6 text-center links"
        >
          App Store
        </a>
        <a
          href="https://github.com/Jellify-Music/App"
          className="font-mono text-sm/6 text-center links"
        >
          GitHub
        </a>
      </main>
    </div>
  );
}
