import Seperator from '../components/Seperator';
import { forwardRef } from 'react';

const Header = ({ title }) => {
  return (
    <header className="mt-2">
      <h1 className="text-sm font-semibold tracking-wide">{title}</h1>
      <Seperator />
    </header>
  )
}

const Builder = forwardRef(({ header, experiences }, ref) => {
  return (
    <div ref={ref} className="resume-page border border-gray-300 rounded-sm aspect-[1/1.414] pl-8 pt-8 pr-8 pb-4 flex flex-col shrink-0 w-198.5 h-280.75">
      <section className='flex flex-col items-center gap-2'>
        <h1 className={header.fullname.className}>
          {header.fullname.value}
        </h1>

        <div className="flex gap-4 text-sm">
          <p className={header.contacts.className}>{header.contacts.value}</p>
          <div className={header.links.className}>
            {header.links.items.map((item) => (
              <div key={item.label} className={item.className}>
                <item.icon />
                {
                  item.url && item.value ? <a className='font-medium' href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                  :
                  <p className="font-medium">{item.value}</p>
                }
              </div>
            ))
            }
          </div>
        </div>
      </section>

      <section>
        <Header title={"EXPERIENCE"} />
        {experiences?.map((experience) => {
          return (
            <div key={experience.company}>
              <div className='flex justify-between text-sm font-medium'>
                <p className=' tracking-wide'>{experience.designation}</p>
                <p className="italic">{experience.duration.start} - {experience.duration.end}</p>
              </div>
              <div className='flex justify-between text-xs mb-1'>
                <p className="font-md">{experience.company}</p>
                <p className="italic">{experience.mode}, {experience.location}</p>
              </div>
              <ol className='list-disc pl-5 space-y-1 text-sm ml-4'>
                {experience.description}
              </ol>
            </div>
          )
        })}
      </section>

      <section>
        <Header title={"PROJECTS"} />
        <section>
          <div className='flex justify-between gap-2 text-sm font-medium'>
            <div className='flex gap-2 items-center'>
              <span className="font-semibold">Model Visulization Website</span>
              <span>|</span>
              <span className="text-xs italic">
                React Js, WebGL, Three Js, File Processing, Optimization
              </span>
            </div>
            <div className=" flex flex-1 gap-2 ml-2">
              <a className='font-medium' href="https://3drr.betoo.co.in/" rel="noopener noreferrer">View</a>
              <a className='font-medium' href="https://github.com/BittuKumar183040/3DRenderer" rel="noopener noreferrer">Github</a>
            </div>
            <div className="text-xs italic">March 2025</div>
          </div>
          <ol className='list-disc pl-5 space-y-1 ml-4 text-sm'>
            <li>
              Designed and developed a <span className="font-semibold">browser-based 2D/3D model visualization tool </span>
              using <span className="font-semibold">React, WebGL, and Three.js</span> to render complex models
              directly file includes <span className="font-semibold">SVG, GLB, FBX, and VTK</span> on canvas with interactions, ensuring efficient loading
              and accurate visualization in the browser.
            </li>

            <li>
              Built advanced <span className="font-semibold">scene controls </span>such as
              <span className="font-semibold"> orbit controls, axis helpers, mesh isolation</span>, and
              <span className="font-semibold"> brightness adjustment </span>to improve model inspection and usability.
            </li>

            <li>
              Solved <span className="font-semibold">scaling and performance challenges</span> for large
              and small models by applying <span className="font-semibold">bounding-box fitting</span>,
              <span className="font-semibold"> normalization</span>, and
              <span className="font-semibold"> camera auto-framing</span> techniques for consistent representation.
            </li>
          </ol>

        </section>

        <section>
          <div className='flex justify-between text-sm font-medium mt-2'>
            <div className='flex gap-2 items-center'>
              <span className="font-semibold">Windoes</span>
              <span>|</span>
              <span className="text-xs italic">
                React, Microservices, JWT Auth, API Gateway, PostgreSQL
              </span>
            </div>
            <div className=" flex flex-1 gap-2 ml-2">
              <a className='font-medium' href="https://betoo.co.in/" rel="noopener noreferrer">View</a>
              <a className='font-medium' href="https://github.com/BittuKumar183040?tab=repositories&q=windoes&type=&language=&sort=name" rel="noopener noreferrer">Github</a>
            </div>
            <div className="text-xs italic">Nov 2025</div>
          </div>
          <ol className='list-disc pl-5 space-y-1 ml-4 text-sm'>
            <li>
              Built a <span className="font-semibold">pixel-perfect Windows 11 - style web application </span>
              with highly interactive UI and native-like behavior.
            </li>

            <li>
              Designed a <span className="font-semibold">microservices architecture </span>
              including Auth, Identity, ...Services, and API Gateway.
            </li>

            <li>
              Implemented <span className="font-semibold">centralized JWT validation </span>
              at the gateway for consistent authorization.
            </li>
            <li>Implemented <span className="font-semibold">Object as S3 and PVC </span>for PnP migration for my storage solution.</li>
            <li>
              Integrated <span className="font-semibold">OpenAPI and Swagger UI </span>
              for API documentation and testing.
            </li>

            <li>
              Optimized client-side performance using <span className="font-semibold">browser memory
                and state management </span>.
            </li>
          </ol>
        </section>
      </section>

      <section>
        <Header title={"TECHNICAL SKILLS"} />
        <div className="space-y-1 text-sm ml-3">
          <p>
            <span className="font-semibold">Languages: </span>
            <span>JavaScript, Python, Java, SQL, HTML/CSS</span>
          </p>
          <p>
            <span className="font-semibold">Developer Tools: </span>
            <span>Git/GitHub/Azure Repos, Podman, Bruno, VS Code, IntelliJ, PyCharm</span>
          </p>
          <p>
            <span className="font-semibold">Technologies/Frameworks: </span>
            <span>React, Redux, Node.js, FastAPI, Spring Boot, Express, PostgreSQL </span>
          </p>
          <p>
            <span className="font-semibold">Deployment & DevOps: </span>
            <span>Containerization, CI/CD, SonarQube, Pen Testing, AWS, S3, PVC </span>
          </p>
          <p>
            <span className="font-semibold">Management Skills: </span>
            <span>Agile delivery, Sprint Planning, Task Assignment, Code Review Oversight, Cross-Team Communication, System Architecture Understanding, Team Mentoring</span>
          </p>
        </div>
      </section>

      <section>
        <Header title={"EDUCATION"} />
        <div className='flex justify-between text-sm font-medium mt-2'>
          <p>MCA - Master in Computer Application</p>
          <p className="italic">Bhopal, Madhya Pradesh, IN</p>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <p className="font-medium text-xs">
            LNCT - Lakshmi Narain College of Technology
          </p>
          <p className="italic text-xs">
            2021 - 2023
          </p>
        </div>
      </section>

      <section>
        <Header title={"CERTIFICATIONS / ACHIEVEMENTS"} />
        <ol className='list-disc pl-5 space-y-1 text-sm mt-2 ml-4'>
          <li>
            <span className="font-medium">
              Certified Full Stack Developer
            </span>
            <span className="italic"> – 2023</span>
            <span> | Mentorkart</span>
          </li>
        </ol>
      </section>
    </div>
  )
});

export default Builder