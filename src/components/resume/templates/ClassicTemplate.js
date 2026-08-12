import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Building2, Code2, Award, GraduationCap } from 'lucide-react';
import { formatDate, calculateDuration } from '../../../utils/dateUtils';

const contactItem = (Icon, content, key) => (
  <div key={key} data-testid="resume-contact-item" className="inline-flex items-center text-sm text-gray-600 leading-5">
    <span className="inline-flex items-center justify-center w-4 h-5 shrink-0 mr-1">
      <Icon className="w-4 h-4 block" />
    </span>
    <span className="leading-5">{content}</span>
  </div>
);

const ClassicTemplate = React.forwardRef(({ profile, experiences, education = [], certifications = [] }, ref) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });

  // Extract all unique skills from experiences
  const allSkills = [...new Set(
    sortedExperiences
      .filter(exp => exp.skills && exp.skills.length > 0)
      .flatMap(exp => exp.skills)
  )];

  return (
    <div ref={ref} className="bg-white p-12 max-w-4xl mx-auto" style={{ minHeight: '11in', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {profile.fullName || 'Your Name'}
        </h1>
        {profile.headline && (
          <h2 className="text-xl text-gray-700 mb-4">
            {profile.headline}
          </h2>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {profile.email && contactItem(Mail, profile.email, 'email')}
          {profile.phone && contactItem(Phone, profile.phone, 'phone')}
          {profile.location && contactItem(MapPin, profile.location, 'location')}
          {profile.linkedin && contactItem(Linkedin, 'LinkedIn', 'linkedin')}
          {profile.website && contactItem(Globe, 'Portfolio', 'website')}
        </div>
      </div>

      {/* Professional Summary */}
      {profile.summary && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {profile.summary}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {allSkills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {sortedExperiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {sortedExperiences.map((exp, index) => (
              <div key={exp.id || index} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center justify-end">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                    <div className="mt-1 font-medium">
                      {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-gray-700 mb-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Technologies:</strong> {exp.skills.join(', ')}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.achievements.map((achievement, i) => (
                      achievement && <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                <p className="text-gray-700 font-semibold">{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {edu.location && `${edu.location} • `}{edu.graduationYear || `${edu.startYear} - ${edu.endYear}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-900">{cert.name}</h4>
                <p className="text-sm text-gray-700">
                  {cert.issuer}
                  {cert.issueDate && ` • ${formatDate(cert.issueDate)}`}
                  {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {sortedExperiences.length === 0 && !profile.summary && (
        <div className="text-center text-gray-400 py-12">
          <p>Add your profile information and work experiences to generate your resume.</p>
        </div>
      )}
    </div>
  );
});

ClassicTemplate.displayName = 'ClassicTemplate';

export default ClassicTemplate;
