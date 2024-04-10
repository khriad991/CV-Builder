import Image from "next/image";
import NavBar from "@/components/NavBar";
import MainLayout from "@/components/MainLayout";
import HomePageComponents from "@/components/HomePageComponents";

export default function Home() {
  return (
   <MainLayout>
       <HomePageComponents/>
   </MainLayout>
  );
}
