import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import img from '../assets/specialization-1.jpg';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const currentTimeInSeconds = new Date().getSeconds();
  useGSAP(() => {
    gsap.to(".cover", {
      yPercent: -120,
      duration: 1.5,
    });

    const scrollItems = gsap.utils.toArray<GSAPTween>(".scroll-item");
    gsap.to(scrollItems, {
      xPercent: -100 * (scrollItems.length - 1),
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".scroll-container",
        pin: true,
        snap: 1 / (scrollItems.length - 1),
        scrub: true,
      },
    });
  });
  return (
    <main className="mt-20">
      <div className="cover fixed left-0 top-0 w-full h-full z-10 min-h-dvh bg-black" />
      This is thr about oage!
      <section className="flex">
        <h2>The time right now: </h2>
        <ul>
          <li>{currentTimeInSeconds}</li>
        </ul>
      </section>
      <section className="overflow-x-hidden">
        <h2 className="text-6xl font-bold text-center">Our specialization</h2>

        <ul className="scroll-container flex">
          <li className="scroll-item relative basis-full min-w-full bg-[url(assets/specialization-1.jpg)] bg-cover h-dvh flex justify-center items-center">
            <div className="inset-0 absolute bg-black opacity-40"></div>
            <a href="#" className="text-5xl z-10 font-bold font-cinzel">
              Web Design
            </a>
          </li>
          <li className="scroll-item relative min-w-full bg-[url(assets/specialization-2.jpg)] bg-cover h-dvh flex justify-center items-center">
            <div className="inset-0 absolute bg-black opacity-40"></div>
            <a href="#" className="text-5xl z-10 font-bold font-cinzel">
              Consultation
            </a>
          </li>
          <li className="scroll-item relative min-w-full bg-[url(assets/specialization-3.jpg)] bg-cover h-dvh flex justify-center items-center">
            <div className="inset-0 absolute bg-black opacity-40"></div>
            <a href="#" className="text-5xl z-10 font-bold font-cinzel">
              Planning
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Some of our work</h2>
        <ul className="flex gap-8 px-16">
          <li>
            <img src={img} alt="" />
          </li>
          <li>
            <img src={img} alt="" />
          </li>
          <li>
            <img src={img} alt="" />
          </li>
          {/* <li>
            <img src="assets/specialization-3.jpg" alt="" />
          </li>
          <li>
            <img src="assets/specialization-3.jpg" alt="" />
          </li> */}
        </ul>
      </section>
      {/* Banner,good bg, text scrambled in

  then SPECIALIZATION - horizontal scroll showing 3 or 4 items
  */}
    </main>
  );
};

export default About;
