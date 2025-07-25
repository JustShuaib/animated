import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import ArrowIcon from "components/arrowIcon";
import Observer from "gsap/dist/Observer";
import StarWithTrail from "components/starWithTrail";
import Star from "components/star";
gsap.registerPlugin(Observer);
export default function Home() {
  const tl = gsap.timeline({delay: 0.5});

  useGSAP(() => {
    gsap.set(".arrow-button", {opacity: 0});
    gsap.set(".rolling-star", {opacity: 0, top: "67%", right: "20%"});
    gsap.set(".bouncing-star", {opacity: 0, top: "40%", right: "10%"});
    gsap.set(".heading-one", {autoAlpha: 0, y: 70});
    tl.to(".cover", {
      yPercent: -120,
      duration: 1.5,
    })
      .to(".heading-one", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.2,
      })
      .to(".arrow-button", {
        opacity: 1,
        ease: "power1.out",
      })
      .to(".rolling-star", {opacity: 1})
      .to(".bouncing-star", {opacity: 1})
      .to(".rolling-star", {
        duration: 5,
        x: 100,
        repeat: -1,
        yoyo: true,
        ease: "linear",
        transformOrigin: "50% 50%",
        scale: 0.1,
        rotate: "360deg",
        fill: "currentColor",
      })
      .add(() => {
        const bouncingStarTl = gsap.timeline({repeat: -1});
        bouncingStarTl
          .to(".bouncing-star", {
            y: -100,
            duration: 1.2,
            ease: "power2.out",
          })
          .to(".bouncing-star", {
            rotate: "360deg",
            duration: 1,
            ease: "linear",
          })
          .to(".bouncing-star", {
            y: 0,
            duration: 1.2,
            ease: "power2.in",
          });
      }, "<");
  });

  const title = "We create & grow brands made to share.".split(" ");

  return (
    <div className="relative overflow-hidden">
      <div className="cover fixed left-0 top-0 w-full h-full z-10 min-h-dvh bg-black" />
      <StarWithTrail />
      <Star gsapClass="bouncing-star" stroke="#1C274C" />
      <Star gsapClass="rolling-star" />
      <section className="header-section flex relative justify-center">
        <h1 className="relative mt-8 text-9xl text-center font-medium max-w-3xl">
          {title.map((text, index) => (
            <span key={index} className="heading-one inline-block mr-10">
              {text + " "}
            </span>
          ))}
        </h1>
        <button className="arrow-button absolute hover:scale-105 flex justify-center items-center gap-4 mb-3 flex-col left-[30%] bottom-2 w-5">
          <ArrowIcon />
          <span className="border-2 rounded-sm uppercase px-1 text-sm w-fit">
            scroll
          </span>
        </button>
      </section>
      {/* TODO: DO SOMETHING THAT REVEALS THE IMAGE SMALL SMALL AS THE USER SCROLLS */}
    </div>
  );
}
