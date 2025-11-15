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
        <p className="font-mono text-sm/6 text-center">
          App Launches Dec. 5, 2025!
        </p>
        <a href="https://github.com/Jellify-Music/App" className="font-mono text-sm/6 text-center">
          GitHub
        </a>
      </main>
      
    </div>
  );
}
