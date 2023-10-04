import HomepageFooter from "./components/HomepageFooter";
import HomepageHeader from "./components/HomepageHeader";
import HomepageJumbotron from "./components/HomepageJumbotron";
import HomepageProcess from "./components/HomepageProcess";
import HomepageTestimonials from "./components/HomepageTestimonials";
import HomepageValueProposition from "./components/HomepageValueProposition";
import HomepageVault from "./components/HomepageVault";

export default function Home() {
  return (
    <main className="bg-tib-white">
      <HomepageHeader />
      <HomepageJumbotron />
      <HomepageValueProposition />
      <HomepageProcess />
      <HomepageVault />
      <HomepageTestimonials />
      <HomepageFooter />
    </main>
  );
}
