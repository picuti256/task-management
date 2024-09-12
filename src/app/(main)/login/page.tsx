import { Login } from "@/app/components/Login";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <div className="flex flex-col items-center align-middle h-full">
      <BackgroundBeamsWithCollision>
        <Login />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
