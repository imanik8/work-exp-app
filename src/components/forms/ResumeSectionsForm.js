import React, { useState } from 'react';
import { Award, BriefcaseBusiness, GraduationCap, Plus, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const emptyEducation = () => ({ id: Date.now(), degree: '', institution: '', location: '', startYear: '', endYear: '', gpa: '' });
const emptyCertification = () => ({ id: Date.now(), name: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '', url: '' });
const emptyProject = () => ({ id: Date.now(), name: '', description: '', technologies: '', url: '', github: '', startDate: '', endDate: '' });

const Section = ({ title, icon: Icon, children, onAdd, addLabel }) => (
  <section className="bg-gray-50 dark:bg-slate-900/60 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-gray-800 dark:text-white flex items-center"><Icon className="w-5 h-5 mr-2 text-linkedin-600" />{title}</h3>
      <Button onClick={onAdd} variant="secondary"><Plus className="w-4 h-4 mr-1" />{addLabel}</Button>
    </div>
    {children}
  </section>
);

const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <Input label={label} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} />
);

const ResumeSectionsForm = ({ education, certifications, projects, onChange }) => {
  const [open, setOpen] = useState({ education: true, certifications: false, projects: false });
  const update = (key, index, patch) => onChange(key, (key === 'education' ? education : key === 'certifications' ? certifications : projects).map((item, i) => i === index ? { ...item, ...patch } : item));
  const remove = (key, index) => onChange(key, (key === 'education' ? education : key === 'certifications' ? certifications : projects).filter((_, i) => i !== index));
  const add = (key, item) => { onChange(key, [...(key === 'education' ? education : key === 'certifications' ? certifications : projects), item]); setOpen((v) => ({ ...v, [key]: true })); };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5">Resume Sections</h2>
      <div className="space-y-4">
        <Section title="Education" icon={GraduationCap} addLabel="Add Education" onAdd={() => add('education', emptyEducation())}>
          {education.length === 0 && <p className="text-sm text-gray-500">Add your degrees, universities and graduation details.</p>}
          {open.education && education.map((edu, i) => (
            <div key={edu.id || i} className="border-t dark:border-gray-700 pt-4 mt-4 first:border-0 first:pt-0 first:mt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Degree" value={edu.degree} onChange={(v) => update('education', i, { degree: v })} placeholder="B.Tech in Computer Science" />
                <Field label="Institution" value={edu.institution} onChange={(v) => update('education', i, { institution: v })} placeholder="IIT Bombay" />
                <Field label="Location" value={edu.location} onChange={(v) => update('education', i, { location: v })} placeholder="Mumbai, India" />
                <Field label="GPA / Grade" value={edu.gpa} onChange={(v) => update('education', i, { gpa: v })} placeholder="8.7/10" />
                <Field label="Start Year" value={edu.startYear} onChange={(v) => update('education', i, { startYear: v })} placeholder="2017" />
                <Field label="End / Graduation Year" value={edu.endYear || edu.graduationYear} onChange={(v) => update('education', i, { endYear: v, graduationYear: v })} placeholder="2021" />
              </div>
              <button onClick={() => remove('education', i)} className="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center"><Trash2 className="w-4 h-4 mr-1" />Remove</button>
            </div>
          ))}
        </Section>

        <Section title="Certifications" icon={Award} addLabel="Add Certification" onAdd={() => add('certifications', emptyCertification())}>
          {certifications.length === 0 && <p className="text-sm text-gray-500">Add professional certifications and credentials.</p>}
          {open.certifications && certifications.map((cert, i) => (
            <div key={cert.id || i} className="border-t dark:border-gray-700 pt-4 mt-4 first:border-0 first:pt-0 first:mt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Certification" value={cert.name} onChange={(v) => update('certifications', i, { name: v })} placeholder="AWS Certified Developer" />
                <Field label="Issuing Organization" value={cert.issuer} onChange={(v) => update('certifications', i, { issuer: v })} placeholder="Amazon Web Services" />
                <Field label="Issue Date" value={cert.issueDate} onChange={(v) => update('certifications', i, { issueDate: v })} type="date" />
                <Field label="Expiry Date" value={cert.expiryDate} onChange={(v) => update('certifications', i, { expiryDate: v })} type="date" />
                <Field label="Credential ID" value={cert.credentialId} onChange={(v) => update('certifications', i, { credentialId: v })} placeholder="ABC123" />
                <Field label="Credential URL" value={cert.url} onChange={(v) => update('certifications', i, { url: v })} placeholder="https://..." type="url" />
              </div>
              <button onClick={() => remove('certifications', i)} className="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center"><Trash2 className="w-4 h-4 mr-1" />Remove</button>
            </div>
          ))}
        </Section>

        <Section title="Projects" icon={BriefcaseBusiness} addLabel="Add Project" onAdd={() => add('projects', emptyProject())}>
          {projects.length === 0 && <p className="text-sm text-gray-500">Showcase high-impact projects, technologies and links.</p>}
          {open.projects && projects.map((project, i) => (
            <div key={project.id || i} className="border-t dark:border-gray-700 pt-4 mt-4 first:border-0 first:pt-0 first:mt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Project Name" value={project.name} onChange={(v) => update('projects', i, { name: v })} placeholder="Career Resume Builder" />
                <Field label="Technologies" value={project.technologies} onChange={(v) => update('projects', i, { technologies: v })} placeholder="React, Node.js, AWS" />
                <Field label="Project URL" value={project.url} onChange={(v) => update('projects', i, { url: v })} placeholder="https://..." type="url" />
                <Field label="GitHub URL" value={project.github} onChange={(v) => update('projects', i, { github: v })} placeholder="https://github.com/..." type="url" />
                <Field label="Start Date" value={project.startDate} onChange={(v) => update('projects', i, { startDate: v })} type="date" />
                <Field label="End Date" value={project.endDate} onChange={(v) => update('projects', i, { endDate: v })} type="date" />
              </div>
              <div className="mt-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description</label><textarea value={project.description || ''} onChange={(e) => update('projects', i, { description: e.target.value })} rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100" placeholder="What did you build and what impact did it have?" /></div>
              <button onClick={() => remove('projects', i)} className="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center"><Trash2 className="w-4 h-4 mr-1" />Remove</button>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default ResumeSectionsForm;
