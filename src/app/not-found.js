import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white flex-col">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">This page could not be found.</p>
      <Link className="text-sky-400 font-semibold " href='/'>Home</Link>
    </div>
  );
}