import Image from "next/image";
import { Login } from "../components/Login";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <div className="flex flex-col items-center align-middle h-full">
      <BackgroundBeamsWithCollision>
        <Login />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
