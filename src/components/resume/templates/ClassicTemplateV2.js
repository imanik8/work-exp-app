import React from 'react';
import ClassicTemplate from './ClassicTemplate';
import ResumeAdditionalSections from '../ResumeAdditionalSections';

const ClassicTemplateV2 = React.forwardRef(({ profile, experiences, education = [], certifications = [], projects = [] }, ref) => (
  <div ref={ref} className="bg-white max-w-4xl mx-auto">
    <ClassicTemplate profile={profile} experiences={experiences} education={education} certifications={certifications} />
    <div className="px-12 pb-12">
      <ResumeAdditionalSections projects={projects} variant="classic" />
    </div>
  </div>
));

ClassicTemplateV2.displayName = 'ClassicTemplateV2';
export default ClassicTemplateV2;
