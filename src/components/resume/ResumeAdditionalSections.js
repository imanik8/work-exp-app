import React from 'react';
import { ExternalLink, Github, BriefcaseBusiness } from 'lucide-react';

const ResumeAdditionalSections = ({ projects = [], variant = 'classic' }) => {
  if (!projects.length) return null;
  const modern = variant === 'modern';
  const minimal = variant === 'minimal';

  return (
    <div className={minimal ? 'mb-10' : 'mb-8'}>
      <h3 className={minimal ? 'text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4' : modern ? 'text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4 flex items-center' : 'text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2 flex items-center'}>
        <BriefcaseBusiness className={minimal ? 'w-4 h-4 mr-2 inline' : 'w-5 h-5 mr-2'} />
        Projects
      </h3>
      <div className={modern ? 'space-y-4 pl-6' : 'space-y-5'}>
        {projects.map((project, index) => (
          <article key={project.id || index} className={modern ? 'bg-gray-50 rounded-lg p-4' : ''}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className={`${minimal ? 'text-lg font-medium' : 'text-lg font-bold'} text-gray-900`}>{project.name || 'Untitled Project'}</h4>
              {(project.startDate || project.endDate) && <span className="text-sm text-gray-500">{project.startDate || ''}{project.endDate ? ` - ${project.endDate}` : project.startDate ? ' - Present' : ''}</span>}
            </div>
            {project.technologies && <p className={`${minimal ? 'font-light' : 'font-medium'} text-sm text-gray-600 mt-1`}>{project.technologies}</p>}
            {project.description && <p className="text-gray-700 leading-relaxed mt-2">{project.description}</p>}
            {(project.url || project.github) && (
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-linkedin-700 hover:underline"><ExternalLink className="w-3.5 h-3.5 mr-1" />Live project</a>}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-700 hover:underline"><Github className="w-3.5 h-3.5 mr-1" />GitHub</a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default ResumeAdditionalSections;
