import React, { useMemo } from 'react';
import { AlertCircle, CheckCircle2, ClipboardCheck, FileSearch, Lightbulb, RefreshCw, Target, Trash2, XCircle } from 'lucide-react';
import Button from '../components/common/Button';
import useProfile from '../hooks/useProfile';
import useExperience from '../hooks/useExperience';
import useResumeSections from '../hooks/useResumeSections';
import useJobMatch from '../hooks/useJobMatch';
import { getMatchLabel } from '../utils/jobMatchUtils';

const ScoreCard = ({ score }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-6">
    <div className="w-28 h-28 rounded-full border-8 border-linkedin-100 dark:border-linkedin-900/40 flex items-center justify-center shrink-0">
      <div className="text-center"><div className="text-3xl font-bold text-linkedin-600">{score}%</div><div className="text-xs text-gray-500">match</div></div>
    </div>
    <div><p className="text-sm text-gray-500 dark:text-gray-400">Overall fit</p><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getMatchLabel(score)}</h2><p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Based only on information saved in your profile.</p></div>
  </div>
);

const Pill = ({ children, tone = 'neutral' }) => {
  const styles = { good: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300', bad: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300', neutral: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200' };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[tone]}`}>{children}</span>;
};

const JobMatch = () => {
  const { profile } = useProfile();
  const { experiences } = useExperience();
  const { education, certifications, projects } = useResumeSections();
  const profileData = useMemo(() => ({ profile, experiences, education, certifications, projects }), [profile, experiences, education, certifications, projects]);
  const { jobDescription, setJobDescription, analysis, analyze, clear } = useJobMatch(profileData);

  const handleAnalyze = () => analyze();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linkedin-600 rounded-full mb-4"><FileSearch className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Job Match</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Paste a job description to compare it with your saved career profile. Everything runs locally in your browser — no API key, account, or paid service required.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4"><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Job description</h2><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use the complete JD for the most useful comparison.</p></div><div className="hidden sm:flex items-center gap-2 text-xs text-gray-500"><ClipboardCheck className="w-4 h-4" />Runs offline</div></div>
          <textarea aria-label="Job description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={12} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-linkedin-500 focus:border-linkedin-500" placeholder="Paste the job description here...\n\nExample:\nSenior Software Engineer\nRequired: Java, Spring Boot, AWS, Kubernetes\nNice to have: Kafka, Terraform" />
          <div className="flex flex-wrap gap-3 mt-4"><Button onClick={handleAnalyze} disabled={!jobDescription.trim()}><Target className="w-4 h-4 mr-2" />Analyze Match</Button><Button onClick={clear} variant="secondary" disabled={!jobDescription && !analysis}><Trash2 className="w-4 h-4 mr-2" />Clear</Button></div>
        </div>

        {!analysis && <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center"><Lightbulb className="w-12 h-12 mx-auto text-linkedin-500 mb-3" /><h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready when you are</h3><p className="text-gray-600 dark:text-gray-300 mt-2">Your job description stays in this browser. The matcher uses a transparent, rule-based keyword engine so it remains completely free.</p></div>}

        {analysis && <div className="space-y-8">
          <ScoreCard score={analysis.score} />
          <div className="grid md:grid-cols-3 gap-4">
            {[['Required skills', analysis.requiredScore], ['Keyword coverage', analysis.keywordScore], ['Preferred skills', analysis.preferredScore]].map(([label, value]) => <div key={label} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5"><p className="text-sm text-gray-500 dark:text-gray-400">{label}</p><p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}%</p></div>)}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"><h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4"><CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />Matched</h3><div className="flex flex-wrap gap-2">{analysis.matched.length ? analysis.matched.map((item) => <Pill key={item} tone="good">{item}</Pill>) : <p className="text-sm text-gray-500">No detected keyword matches yet.</p>}</div></div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"><h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4"><XCircle className="w-5 h-5 mr-2 text-red-600" />Gaps</h3><div className="flex flex-wrap gap-2">{analysis.missing.length ? analysis.missing.map((item) => <Pill key={item} tone="bad">{item}</Pill>) : <p className="text-sm text-gray-500">No detected keyword gaps.</p>}</div></div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"><div className="flex items-center justify-between mb-5"><div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Skill coverage</h3><p className="text-sm text-gray-500 dark:text-gray-400">Only categories mentioned in the JD are shown.</p></div>{analysis.seniority && <Pill>{analysis.seniority}</Pill>}</div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{analysis.categories.map((category) => <div key={category.name} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"><div className="flex justify-between mb-2"><span className="font-semibold text-gray-800 dark:text-white">{category.name}</span><span className="text-sm font-bold text-linkedin-600">{category.score}%</span></div><div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-linkedin-600" style={{ width: `${category.score}%` }} /></div><div className="flex flex-wrap gap-1 mt-3">{category.matched.map((item) => <Pill key={item} tone="good">{item}</Pill>)}{category.missing.map((item) => <Pill key={item} tone="bad">{item}</Pill>)}</div></div>)}</div></div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex gap-3"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><div><h3 className="font-bold text-amber-900 dark:text-amber-200">Transparent by design</h3><p className="text-sm text-amber-800 dark:text-amber-300 mt-1">This first version is intentionally deterministic. It does not invent experience or send your resume to a third-party AI service. Future AI features can build on this analysis without changing the free local-first foundation.</p></div></div>
          <div className="text-center"><Button onClick={handleAnalyze} variant="secondary"><RefreshCw className="w-4 h-4 mr-2" />Re-analyze</Button></div>
        </div>}
      </div>
    </div>
  );
};

export default JobMatch;
