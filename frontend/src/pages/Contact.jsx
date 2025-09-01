import React from "react";

const AboutMe = () => {
  return (
    <div className="min-h-[64vh] py-8 px-4 bg-base-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">About Me</h1>
          <p className="text-base-content/70">Get to know me better 👋</p>
        </div>

        <div className="space-y-6">
          {/* Intro Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-2">👨‍💻 Who am I?</h2>
              <p className="text-base-content/80 leading-relaxed">
                Hi, I’m <span className="font-bold">Prathamesh Powar</span>, a
                passionate full-stack developer who loves building modern web
                apps with React, Node.js, and creative UI design. I enjoy
                turning complex problems into simple, beautiful solutions.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-2">🛠️ Skills</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Tailwind CSS",
                  "Next.js",
                  "TypeScript",
                  "Git & GitHub",
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="bg-base-200 rounded-md px-3 py-2 text-sm font-medium text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-2">🚀 Projects</h2>
              <ul className="list-disc list-inside space-y-2 text-base-content/80">
                <li>
                  <span className="font-semibold">Real-time Chat App</span> – A
                  responsive messaging platform with live updates.
                </li>
                <li>
                  <span className="font-semibold">Sampoorna Builders</span> – A
                  calculator for building areas & quotations.
                </li>
                <li>
                  <span className="font-semibold">Portfolio Website</span> –
                  Modern design with animations & interactive UI.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-2">📬 Contact Me</h2>
              <p className="text-base-content/80 mb-3">
                I’m always open to exciting opportunities and collaborations.
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  prathamesh@example.com
                </p>
                <p>
                  <span className="font-medium">GitHub:</span>{" "}
                  <a href="https://github.com/PrathameshPowar-dan" className="link link-primary">
                    github.com/PrathameshPowar-dan
                  </a>
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  <a href="https://www.linkedin.com/in/prathamesh-powar-dan/" className="link link-primary">
                    linkedin.com/in/prathamesh-powar-dan
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
