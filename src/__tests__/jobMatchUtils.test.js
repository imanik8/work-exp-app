import { analyzeJobDescription, extractKeywords, extractRequirements, getMatchLabel } from '../utils/jobMatchUtils';

describe('jobMatchUtils', () => {
  const job = `Senior Backend Engineer\nRequired: Java, Spring Boot, AWS, Kubernetes\nNice to have: Kafka, Terraform\nBachelor's degree preferred`;
  const profile = {
    profile: { headline: 'Senior Backend Engineer', summary: 'Backend engineer building Java services on AWS.' },
    experiences: [{ position: 'Software Engineer', company: 'Acme', description: 'Built Spring Boot microservices with Kubernetes.', skills: ['Java', 'AWS', 'Spring Boot'], achievements: [] }],
    education: [{ degree: 'Bachelor of Technology', institution: 'University' }],
    certifications: [],
    projects: [{ name: 'Event platform', description: 'Kafka based services', technologies: 'Java, Kafka' }]
  };

  test('extracts known keywords case-insensitively', () => {
    expect(extractKeywords(job)).toEqual(expect.arrayContaining(['java', 'spring boot', 'aws', 'kubernetes', 'kafka', 'terraform', 'senior', 'bachelor']));
  });

  test('classifies required and preferred skills', () => {
    const result = extractRequirements(job);
    expect(result.required).toEqual(expect.arrayContaining(['java', 'spring boot', 'aws', 'kubernetes']));
    expect(result.preferred).toEqual(expect.arrayContaining(['kafka', 'terraform']));
  });

  test('matches skills across profile, experience, education and projects', () => {
    const result = analyzeJobDescription(job, profile);
    expect(result.matched).toEqual(expect.arrayContaining(['java', 'spring boot', 'aws', 'kubernetes', 'kafka']));
    expect(result.missing).toContain('terraform');
    expect(result.requiredScore).toBe(100);
    expect(result.score).toBeGreaterThan(70);
    expect(result.categories.find((category) => category.name === 'Cloud').score).toBe(100);
  });

  test('handles a job with no recognized keywords', () => {
    const result = analyzeJobDescription('Join our amazing team and make an impact.', profile);
    expect(result.score).toBe(100);
    expect(result.keywords).toEqual([]);
    expect(result.categories).toEqual([]);
  });

  test('returns stable labels for score bands', () => {
    expect(getMatchLabel(90)).toBe('Strong match');
    expect(getMatchLabel(75)).toBe('Good match');
    expect(getMatchLabel(55)).toBe('Partial match');
    expect(getMatchLabel(20)).toBe('Low match');
  });
});
