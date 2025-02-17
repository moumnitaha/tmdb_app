"use client";
import { useRouter } from "next/navigation";
import SplitText from "@/SplitText/SplitText";
import Orb from "../Orb/Orb";

export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full fixed">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <SplitText
        text="EXPLORE YOUR FAVORITE MOVIES"
        textAlign="center"
        className="text-6xl font-semibold text-center text-white"
        delay={250}
        animationFrom={{
          opacity: 0,
          transform: "translate3d(0,50px,0)",
        }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        // easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={() => router.push("/movies")}
      />
    </main>
  );
}
