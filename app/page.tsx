"use client";
import { useRouter } from "next/navigation";
import SplitText from "@/SplitText/SplitText";
import GridMotion from "@/GridMotion/GridMotion";

export default function Home() {
  const router = useRouter();
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <SplitText
        text="EXPLORE YOUR FAVORITE MOVIES"
        className="text-6xl font-semibold text-center text-white"
        delay={150}
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
