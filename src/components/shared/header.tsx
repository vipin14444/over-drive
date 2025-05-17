import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "./container";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Header() {
  return (
    <header>
      <Container className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/overdrive_logo.webp"
            alt="OverDrive Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-2xl font-bold">OverDrive</div>
        </div>
        <nav className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <div className="-mr-2 flex items-center gap-2 p-2">
                Continue to my drive <FaArrowRightLong />
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </Container>
    </header>
  );
}
