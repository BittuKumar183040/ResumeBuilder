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

const Builder = forwardRef(({ header, experiences, projects, skills, education, certifications }, ref) => {
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
        {experiences.length > 0 && (
          <Header title={"EXPERIENCE"} />
        )}
        {experiences?.map((experience, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between">
                <p className={`tracking-wide text-sm font-medium ${experience.designation.className}`}>
                  {experience.designation.value}
                </p>
                <p className={`italic text-sm ${experience.duration.className}`}>
                  {experience.duration.value.start} - {experience.duration.value.end}
                </p>
              </div>

              <div className="flex justify-between">
                <p className={`text-xs ${experience.company.className}`} > {experience.company.value} </p>
                <p className={`italic text-xs ${experience.mode.className} ${experience.location.className}`}>
                  {experience.mode.value}{experience.location.value ? `, ${experience.location.value}` : ""}
                </p>
              </div>

              <ol className={`list-disc pl-5 space-y-1 text-sm ml-4 ${experience.description.className}`}>
                {experience.description.value}
              </ol>
            </div>
          )
        })}
      </section>

      <section>
        {projects.length > 0 && (
          <Header title={"PROJECTS"} />
        )}
        {projects?.map((project, index) => {
          const tech = project.technology.value.join(", ")
          return (
            <section key={index}>
              <div className="flex justify-between gap-2 text-sm font-medium">
                <div className="flex gap-2 items-center">
                  <span className={project.title.className}>{project.title.value}</span>
                  <span>|</span>
                  <span className={project.technology.className}>{tech}</span>
                </div>
                <div className="flex flex-1 gap-2 ml-2">
                  {project.live.value && (
                    <a className={project.live.className} href={project.live.value} rel="noopener noreferrer" target="_blank" >View</a>
                  )}
                  {project.github.value && (
                    <a className={project.github.className} href={project.github.value} rel="noopener noreferrer" target="_blank" >Github</a>
                  )}
                </div>
                <div className={project.date.className}>{project.date.value}</div>
              </div>
              <ol className={project.description.className}>
                {project.description.value}
              </ol>
            </section>
          )
        })
        }
      </section>

      <section>
        {skills.length > 0 && (
          <Header title={"TECHNICAL SKILLS"} />
        )}
        <div className="space-y-1 ml-3">
          {skills.map((skill, index) => {
            const items = skill.items.value.join(", ")
            return (
              <p key={index}>
                <span className={skill.category.className}>
                  {skill.category.value}:
                </span>
                <span className={skill.items.className}>
                  {" "}{items}
                </span>
              </p>
            )
          })}
        </div>
      </section>

      <section>
        {education.length > 0 && <Header title={"EDUCATION"} />}
        {education.map((edu, index) => (
          <div key={index} className="ml-3">
            <div className="flex justify-between text-sm font-medium mt-2">
              <p className={edu.degree.className}>
                {edu.degree.value}
              </p>

              <p className={edu.location.className}>
                {edu.location.value}
              </p>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <p className={edu.college.className}>
                {edu.college.value}
              </p>
              <p className={edu.duration.className}>
                {edu.duration.value}
              </p>
            </div>
          </div>
        ))}
      </section>


      <section>
        {certifications.length > 0 && (
          <Header title={"CERTIFICATIONS / ACHIEVEMENTS"} />
        )}
        <ol className="list-disc pl-5 space-y-1 text-sm mt-2 ml-4">
          {certifications.map((cert, index) => (
            <li key={index}>
              <span className={cert.title.className}>
                {cert.title.value}
              </span>
              {cert.year.value && (
                <span className={cert.year.className}> {" - "}{cert.year.value} </span>
              )}
              {cert.issuer.value && (
                <span> {" | "}{cert.issuer.value} </span>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
});

export default Builder