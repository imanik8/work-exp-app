const SKILL_GROUPS = {
  Languages: ['javascript', 'typescript', 'java', 'python', 'go', 'golang', 'c++', 'c#', 'ruby', 'kotlin', 'swift', 'rust', 'php'],
  Backend: ['node.js', 'nodejs', 'spring boot', 'spring', 'express', 'rest api', 'rest apis', 'graphql', 'microservices', 'distributed systems', 'api design'],
  Frontend: ['react', 'next.js', 'nextjs', 'angular', 'vue', 'html', 'css', 'tailwind'],
  Cloud: ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'cloud computing', 'serverless'],
  Data: ['sql', 'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'dynamodb', 'kafka', 'spark', 'elasticsearch'],
  DevOps: ['docker', 'kubernetes', 'k8s', 'terraform', 'jenkins', 'github actions', 'ci/cd', 'linux'],
  Security: ['oauth', 'oauth2', 'oidc', 'saml', 'authentication', 'authorization', 'identity', 'security'],
  Tools: ['git', 'github', 'jira', 'datadog', 'prometheus', 'grafana']
};

const SENIORITY = ['intern', 'junior', 'mid-level', 'mid level', 'senior', 'staff', 'principal', 'lead', 'manager'];
const EDUCATION = ['bachelor', "bachelor's", 'master', "master's", 'phd', 'degree', 'computer science'];

const normalize = (value = '') => value.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^a-z0-9+#./\-\s]/g, ' ').replace(/\s+/g, ' ').trim();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const containsTerm = (text, term) => new RegExp(`(^|[^a-z0-9+#])${escapeRegExp(term)}(?=$|[^a-z0-9+#])`, 'i').test(text);

export const extractKeywords = (jobDescription) => {
  const text = normalize(jobDescription);
  const keywords = [];
  Object.values(SKILL_GROUPS).flat().forEach((skill) => {
    if (containsTerm(text, skill) && !keywords.includes(skill)) keywords.push(skill);
  });
  SENIORITY.concat(EDUCATION).forEach((term) => {
    if (containsTerm(text, term) && !keywords.includes(term)) keywords.push(term);
  });
  return keywords;
};

export const extractRequirements = (jobDescription) => {
  const required = [];
  const preferred = [];
  const lines = jobDescription.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const preferredContext = /(preferred|nice to have|bonus|plus|desired|preferred qualifications)/i;
  const skillTerms = Object.values(SKILL_GROUPS).flat();
  lines.forEach((line) => {
    const normalizedLine = normalize(line);
    skillTerms.filter((skill) => containsTerm(normalizedLine, skill)).forEach((skill) => {
      const target = preferredContext.test(line) ? preferred : required;
      if (!target.includes(skill)) target.push(skill);
    });
  });
  return { required, preferred };
};

const buildProfileText = ({ profile = {}, experiences = [], education = [], certifications = [], projects = [] }) => normalize([
  profile.headline, profile.summary,
  ...experiences.flatMap((e) => [e.position, e.company, e.description, ...(e.skills || []), ...(e.achievements || [])]),
  ...education.flatMap((e) => [e.degree, e.institution, e.gpa]),
  ...certifications.flatMap((c) => [c.name, c.issuer]),
  ...projects.flatMap((p) => [p.name, p.description, p.technologies])
].filter(Boolean).join(' '));

export const analyzeJobDescription = (jobDescription, profileData) => {
  const text = normalize(jobDescription);
  const profileText = buildProfileText(profileData);
  const keywords = extractKeywords(jobDescription);
  const { required, preferred } = extractRequirements(jobDescription);
  const matched = keywords.filter((keyword) => containsTerm(profileText, keyword));
  const missing = keywords.filter((keyword) => !containsTerm(profileText, keyword));
  const matchedRequired = required.filter((keyword) => containsTerm(profileText, keyword));
  const matchedPreferred = preferred.filter((keyword) => containsTerm(profileText, keyword));
  const requiredScore = required.length ? Math.round((matchedRequired.length / required.length) * 100) : 100;
  const preferredScore = preferred.length ? Math.round((matchedPreferred.length / preferred.length) * 100) : 100;
  const keywordScore = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 100;
  const educationMentioned = EDUCATION.some((term) => containsTerm(text, term));
  const educationMatch = !educationMentioned || (profileData.education || []).length > 0 ? 100 : 0;
  const score = Math.round(requiredScore * 0.6 + keywordScore * 0.25 + preferredScore * 0.1 + educationMatch * 0.05);
  const categories = Object.entries(SKILL_GROUPS).map(([name, skills]) => {
    const relevant = skills.filter((skill) => containsTerm(text, skill));
    const hits = relevant.filter((skill) => containsTerm(profileText, skill));
    return { name, score: relevant.length ? Math.round((hits.length / relevant.length) * 100) : null, matched: hits, missing: relevant.filter((skill) => !hits.includes(skill)) };
  }).filter((category) => category.score !== null);
  const seniority = SENIORITY.find((term) => containsTerm(text, term));
  return { score, keywords, matched, missing, required, preferred, matchedRequired, matchedPreferred, requiredScore, preferredScore, keywordScore, educationMatch, seniority, categories, generatedAt: new Date().toISOString() };
};

export const getMatchLabel = (score) => score >= 85 ? 'Strong match' : score >= 70 ? 'Good match' : score >= 50 ? 'Partial match' : 'Low match';

export default analyzeJobDescription;
