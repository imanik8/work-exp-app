import React from 'react';
import ModernTemplate from './ModernTemplate';
import ResumeAdditionalSections from '../ResumeAdditionalSections';

const ModernTemplateV2 = React.forwardRef(({ profile, experiences, education = [], certifications = [], projects = [] }, ref) => (
  <div ref={ref} className="bg-white max-w-4xl mx-auto">
    <ModernTemplate profile={profile} experiences={experiences} education={education} certifications={certifications} />
    <div className="px-12 pb-12">
      <ResumeAdditionalSections projects={projects} variant="modern" />
    </div>
  </div>
));

ModernTemplateV2.displayName = 'ModernTemplateV2';
export default ModernTemplateV2;
