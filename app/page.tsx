import { AdeHero } from "@/components/ade/AdeHero";
import { AdeNav } from "@/components/ade/AdeNav";
import { AdeFooter } from "@/components/ade/AdeFooter";
import {
  AdeAbout,
  AdeCapabilities,
  AdeContact,
  AdePlatforms,
  AdeProcess,
  AdeSoftware,
  AdeWork,
} from "@/components/ade/AdeSections";

export default function Home() {
  return (
    <>
      <AdeNav />
      <main>
        <AdeHero />
        <AdeAbout />
        <AdeSoftware />
        <AdePlatforms />
        <AdeCapabilities />
        <AdeProcess />
        <AdeWork />
        <AdeContact />
      </main>
      <AdeFooter />
    </>
  );
}
