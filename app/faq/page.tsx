import '../globals.css';
import React, { JSX } from 'react';
import Link from 'next/link';

const Explore: React.FC = (): JSX.Element => {
  return (
    <div className="ineed.io-faq-page">
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="grid border-t border-gray-200 pt-8 text-left dark:border-gray-700 md:grid-cols-2 md:gap-16">
            <div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  What makes Ineed.io different?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Using Ineed for internship searching allows for an all in one website to help you
                  progress in landing internships. Here we maximize engagment with users to allow
                  for a more fluid searching process with engagement. Utilizing all of our different
                  features allows for all the assitance you need.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How do I search for internships?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You can search by keyword, location, industry, or company name using the search
                  bar or filters.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Can I apply for internships directly through the app?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Yes, you can apply directly through Ineed.io.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Feel free to{' '}
                  <Link
                    href="/team"
                    className="text-primary-600 dark:text-primary-500 font-medium underline hover:no-underline"
                  >
                    contact us
                  </Link>{' '}
                  and we&apos;ll help you out as soon as we can.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How do I track my applications?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You can check your application status in the &ldquo;My Applications&ldquo;
                  section.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Find out more information by{' '}
                  <Link
                    href="/profile"
                    className="text-primary-600 dark:text-primary-500 font-medium underline hover:no-underline"
                  >
                    going to the profile tab
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Is Ineed.io free?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Yes! Ineed.io is free to all users, allowing users to traverse their internship
                  journey.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Do I need a resume to apply for internships?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Yes, most companies require a resume. You can upload your resume or create one
                  using our resume builder.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  I forgot my password. How can I reset it?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click on &ldquo;Forgot Password&ldquo; on the login screen and follow the
                  instructions to reset it.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How can I increase my chances at landing an internship?
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep your profile complete, add relevant skills, upload a professional resume, and
                  include any certifications or projects.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Make sure to complete{' '}
                  <Link
                    href="/profile"
                    className="text-primary-600 dark:text-primary-500 font-medium underline hover:no-underline"
                  >
                    your profile
                  </Link>{' '}
                  if you have not already.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
