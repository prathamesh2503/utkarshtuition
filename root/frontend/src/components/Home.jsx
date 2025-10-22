import Header from "./Header";
import AboutMe from "./AboutMe";
import Achievement from "./Achievement";
import ContactMe from "./ContactMe";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <section id="home">
        <Header />
        <AboutMe />
        <Achievement />
        <ContactMe />
        <Footer />
      </section>
    </>
  );
};

export default Home;
