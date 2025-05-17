import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Container from "~/components/shared/container";
import Header from "~/components/shared/header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950">
      <Header />
      <Container className="p-4 text-white">
        <section className="flex flex-col gap-4 py-32 text-center">
          <h1 className="text-7xl font-bold">Welcome to OverDrive</h1>
          <p className="text-2xl font-extralight text-neutral-300">
            All your storage needs in one place, be it image, audio or video!
          </p>

          <div className="mx-auto mt-4 w-fit">
            <SignedOut>
              <SignInButton mode="modal">
                <div className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-purple-600 to-purple-800 p-3 px-4">
                  Get Started <FaArrowRightLong />
                </div>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href={"/drive/my-drive"}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-purple-600 to-purple-800 p-3 px-4"
              >
                View My Drive <FaArrowRightLong />
              </Link>
            </SignedIn>
          </div>

          <Image
            className="mt-12"
            src={"/overdrive-home.webp"}
            alt="homepage"
            width={2650}
            height={1716}
          />
        </section>
      </Container>
    </main>
  );
}
