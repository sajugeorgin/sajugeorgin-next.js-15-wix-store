import { FacebookIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background flex flex-col items-start gap-10 p-10 shadow-sm">
      {/* TOP SECTION */}
      <div className="flex max-w-4xl flex-col items-start gap-4 text-left">
        <p className="text-xl font-bold tracking-wide">Nirra</p>

        <span className="max-w-4xl text-sm">
          Nirra is a modern label for everyday style. We focus on quality, fit
          and comfort. Build a wardrobe that works!
        </span>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4">
          {[FacebookIcon, GithubIcon, TwitterIcon].map((Icon, i) => (
            <div
              key={i}
              className="w-fit cursor-pointer rounded-full bg-black/20 p-2 transition-transform duration-300 hover:scale-110 hover:bg-amber-500"
            >
              <Icon className="size-4" />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-sm font-bold tracking-widest">COMPANY</h1>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            About
          </Link>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            Works
          </Link>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            Career
          </Link>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h1 className="text-sm font-bold tracking-widest">SUPPORT</h1>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            Help Centre
          </Link>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            FAQs
          </Link>
          <Link
            href={"#"}
            className="hover:text-primary transition-transform duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* NEWSLETTER */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-sm font-bold tracking-widest">NEWSLETTER</h1>
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full"
          />
          <Button className="sm:w-aut w-[50%] cursor-pointer transition duration-300 hover:scale-105">
            Subscribe
          </Button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-muted-foreground mt-5 text-xs">
        © {new Date().getFullYear()} Nirra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
