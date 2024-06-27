import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="Footer overflow-hidden py-20">
      <div className="container z-10 px-4">
        <div className="-m-6 grid grid-cols-2 md:grid-cols-4">
          <div className="w-full p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-base md:text-lg font-semibold uppercase text-gray-500">
                Need Help
              </h3>
              <ul>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Contact us
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Track Order
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Returns & Refunds
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    FAQ's
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Career
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-base md:text-lg font-semibold uppercase text-gray-500">
                Compnay
              </h3>
              <ul>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    About Us
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Euphoria Blog
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Collabraction
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Media
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-base md:text-lg font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-base md:text-lg font-semibold uppercase text-gray-500">
                Location
              </h3>
              <ul>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    nomanansarrii17@gmail.com
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className=" text-base font-medium" to="/">
                    Multan, Pakistan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Popular Categories</AccordionTrigger>
            <AccordionContent>
              <div className="w-full p-6">
                <div className="h-full">
                  <h3 className="tracking-px mb-9  text-base md:text-lg font-semibold uppercase text-gray-500">
                    Categories
                  </h3>
                  <ul>
                    <li className="mb-3">
                      <Link className=" text-base font-medium" to="/">
                        Men
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link className=" text-base font-medium" to="/">
                        Women
                      </Link>
                    </li>
                    <li>
                      <Link className=" text-base font-medium" to="/">
                        LimeLight
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="container mt-5">
        <h1>Copyright © 2024 Euphoria Noman Pvt Ltd. All rights reserved.</h1>
      </div>
    </section>
  );
}

export default Footer;
