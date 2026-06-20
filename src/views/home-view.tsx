import {
  About,
  BackToTop,
  Contact,
  CustomCursor,
  Experience,
  Footer,
  Header,
  Hero,
  Preloader,
  Projects,
  ScrollProgress,
  Skills,
  Stats,
} from '@/widgets';

/** Full single-page portfolio composition. */
export function HomeView() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
