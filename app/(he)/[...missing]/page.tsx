import { notFound } from "next/navigation";

// Unknown addresses render this language's 404 inside its own root layout.
export default function Missing() {
  notFound();
}
