import React from 'react';
import { Building2, MapPin, Calendar, Award, Trash2 } from 'lucide-react';
import { calculateDuration, formatDate } from '../../utils/dateUtils';

const ExperienceCard = ({ experience, onRemove, index }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* Remove background and border, align icon/logo with text */}
            {experience.companyLogo ? (
              <img
                src={experience.companyLogo}
                alt={experience.company}
                className="w-8 h-8 object-contain rounded-md"
                style={{ minWidth: '2rem' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100" style={{ minWidth: '2rem' }}>
                <Building2 className="w-5 h-5 text-gray-400" />
              </span>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-800">{experience.position}</h3>
              <p className="text-lg text-indigo-600 font-semibold">{experience.company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            {experience.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{experience.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {formatDate(experience.startDate)} - 
                {experience.current ? ' Present' : ` ${formatDate(experience.endDate)}`}
              </span>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {calculateDuration(experience.startDate, experience.endDate, experience.current)}
            </div>
          </div>

          {experience.description && (
            <p className="text-gray-700 mb-4 leading-relaxed">{experience.description}</p>
          )}

          {experience.achievements.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => onRemove(experience.id)}
          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;