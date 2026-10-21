import { JsonLd } from "@/components/json-ld";
import { Landing } from "@/components/landing";
import { homeJsonLd, homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata("en");

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd("en")} />
      <Landing locale="en" />
    </>
  );
}
