import React from 'react';
import Testimonial1 from '../media/Reviews/1.png';
import Testimonial2 from '../media/Reviews/2.png';
import Testimonial3 from '../media/Reviews/3.png';

const feedback = [
  {
    src: Testimonial1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nesciunt saepe molestiae esse quae aut nihil quod assumenda, consectetur vel harum dolorem debitis beatae voluptas repellat quam officia, unde eligendi temporibus non voluptate dolores eum. Mollitia modi quod nostrum tempora, doloribus repudiandae itaque? Unde recusandae repellendus dolores fuga eos quaerat.",
    about: "Floyd Miles",
    length: 4
  },
  {
    src: Testimonial2,
    desc: "ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    about: "Ronald Richards",
    length: 5
  },
  {
    src: Testimonial3,
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    about: "Savannah Nguyen",
    length: 3
  },
];

function Testimonial() {
  return (
    <div className="container py-10">
      <div className="heading flex my-20">
        <span className="line rounded-xl mr-3"></span>
        <h1 className="text-5xl font-medium">Feedback</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {feedback.map((feed, i) => (
          <div key={i} className="flex flex-col rounded-md bg-white border-black border-2 p-8">
            <div className="mb-4 flex space-x-2">
              {Array.from({ length: feed.length }).map((_, i) => (
                <span key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              ))}
            </div>
            <div className="flex-1 pt-2">
              <blockquote>
                <p className="text-lg text-gray-800">
                  "{feed.desc}"
                </p>
              </blockquote>
            </div>

            <div className="mt-8 border-t border-gray-300 pt-4 dark:border-gray-800">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  src={feed.src}
                  alt=""
                />
                <div className="ml-3 min-w-0">
                  <p className="truncate text-base font-semibold text-gray-800">{feed.about}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;