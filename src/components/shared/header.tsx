import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-900 p-4 text-white">
      <h1 className="text-2xl font-bold">OverDrive</h1>
      <nav className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal"/>
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
