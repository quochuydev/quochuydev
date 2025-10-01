import { Link } from "@tanstack/react-router";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/ai", label: "AI Chat" },
  ] as const;

  return <div></div>;
}
