import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {Observer} from "gsap/dist/Observer";
import {TextPlugin} from "gsap/dist/TextPlugin";
import {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router";

const Nav = () => {
  gsap.registerPlugin(TextPlugin);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (open) handleBtn();
  }, [location.pathname]);
  const {contextSafe} = useGSAP(() => {
    gsap.set(".nav-container", {yPercent: 100});
    gsap.set(".nav-container ul li", {autoAlpha: 0, xPercent: 20});
    const navLinks = gsap.utils.toArray<HTMLLIElement>(".nav-container ul li");
    navLinks.forEach((link) => {
      Observer.create({
        target: link,
        onHover: () => {
          navLinks.forEach((otherLink) => {
            if (otherLink !== link) {
              gsap.to(otherLink, {
                ease: "power1.inOut",
                duration: 0.5,
                opacity: 0.1,
              });
            } else {
              gsap.to(otherLink, {
                x: -30,
                duration: 0.5,
                opacity: 1,
              });
            }
          });
        },
        onHoverEnd: () => {
          gsap.to(navLinks, {
            opacity: 1,
            x: 0,
            ease: "power1.inOut",
            duration: 0.5,
          });
        },
      });
    });
  });
  const handleBtn = contextSafe(() => {
    const navTl = gsap.timeline();
    if (open) {
      document.body.style.overflowY = "auto";
      navTl
        .to(".nav-container", {
          yPercent: -100,
          duration: 0.6,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(".nav-container", {
              yPercent: 100,
            });
            gsap.set(".nav-container ul li", {autoAlpha: 0, xPercent: 20});
          },
        })
        .to(
          ".nav-control",
          {
            text: "menu",
            rtl: true,
            duration: 0.6,
          },
          "<"
        );
    } else {
      document.body.style.overflowY = "hidden";
      navTl
        .to(".nav-container", {
          yPercent: 0,
          duration: 0.4,
          ease: "power1.in",
        })
        .to(".nav-control", {
          text: "close",
          rtl: true,
          duration: 0.6,
        })
        .to(".nav-container ul li", {
          stagger: 0.3,
          autoAlpha: 1,
          xPercent: 0,
          ease: "power1.out",
        });
    }
    setOpen((value) => !value);
  });

  return (
    <nav>
      <div className="flex fixed w-full z-20 font-bold font-cinzel justify-between items-center px-28 py-4">
        <span>S - O </span>
        <button
          onClick={handleBtn}
          type="button"
          className="nav-control uppercase text-2xl"
        >
          menu
        </button>
      </div>
      <div className="nav-container bg-black font-rubik-dirt z-10 text-8xl text-right px-36 uppercase fixed left-0 top-0 w-full h-dvh">
        <ul className="flex flex-col justify-center gap-y-5 h-full">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="border-y py-3">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
