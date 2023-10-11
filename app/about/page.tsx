import React from "react";

const AboutPage = () => {
  return (
    <section className="max-w-2xl mx-auto mt-24">
      <h1 className="text-2xl">About</h1>
      <p className="my-2">
        Project by{" "}
        <a
          href="https://franklinnn.com"
          target="_blank"
          className="hover:cursor-pointer hover:underline font-semibold"
        >
          Franklin Assa
        </a>
      </p>
      <p className="my-2">
        <a
          href="https://github.com/franklinnnn"
          target="_blank"
          className="hover:cursor-pointer hover:underline font-semibold"
        >
          GitHub repository
        </a>
      </p>
    </section>
  );
};

export default AboutPage;
