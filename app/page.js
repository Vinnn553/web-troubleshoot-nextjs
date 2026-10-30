import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./home/HeroSection";
import CategorySection from "./home/CategorySection";
import TutorialList from "./home/TutorialList";
import pool from "@/lib/db"
import { Suspense } from "react";


export default async function Home() {
  // let tutorials = [];
  'use cache'

  const result = await pool.query('SELECT * FROM "tutorialList" ORDER BY id ASC');
  const tutorials = result.rows;

  return (
    <div>
      <Header />
      <HeroSection />
      <CategorySection />
      <Suspense>
        <TutorialList initialTutorials={tutorials} />
      </Suspense>
      
      <Footer />
    </div >
  )
}
