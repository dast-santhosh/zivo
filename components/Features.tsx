import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Loader2, 
  Upload, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Calendar,
  BrainCircuit,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  chatWithTutor, 
  generateNotes, 
  generateStudyPlan, 
  generateQuiz 
} from '../services/geminiService';
import { 
  ChatMessage, 
  Note, 
  StudyPlanItem, 
  QuizQuestion, 
  AppRoute 
} from '../types';

// --- DASHBOARD COMPONENT ---
export const Dashboard: React.FC<{ onNavigate: (r: AppRoute) => void }> = ({ onNavigate }) => {
  const data = [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 70 },
    { name: 'Wed', score: 68 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 82 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 95 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, Student! 👋</h2>
        <p className="text-slate-500 mt-2">Here's what's happening in your study schedule today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700">Daily Streak</h3>
            <Trophy className="text-yellow-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-slate-900">12 <span className="text-sm font-normal text-slate-500">days</span></p>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full w-3/4 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700">Questions Solved</h3>
            <CheckCircle2 className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-4xl font-bold text-slate-900">148</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" /> +24 from last week
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-semibold text-primary-100">Next Up</h3>
          <p className="text-2xl font-bold mt-2">Physics: Thermodynamics</p>
          <div className="flex items-center mt-4 text-primary-100 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>2:00 PM - 3:30 PM</span>
          </div>
          <button 
            onClick={() => onNavigate(AppRoute.TUTOR)}
            className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors font-medium flex items-center justify-center"
          >
            Start Learning <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Exam Readiness Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="space-y-4">
             <button 
                onClick={() => onNavigate(AppRoute.NOTES)}
                className="w-full flex items-center p-4 rounded-xl border border-slate-100 hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="ml-4 text-left">
                  <h4 className="font-semibold text-slate-900">Upload Textbook Page</h4>
                  <p className="text-sm text-slate-500">Get instant summary notes</p>
                </div>
                <ArrowRight className="ml-auto text-slate-400 group-hover:text-primary-600" />
             </button>

             <button 
                onClick={() => onNavigate(AppRoute.PLANNER)}
                className="w-full flex items-center p-4 rounded-xl border border-slate-100 hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="ml-4 text-left">
                  <h4 className="font-semibold text-slate-900">Update Schedule</h4>
                  <p className="text-sm text-slate-500">Re-plan your week</p>
                </div>
                <ArrowRight className="ml-auto text-slate-400 group-hover:text-primary-600" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TUTOR COMPONENT ---
export const Tutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hi! I am ZIVO, your AI Tutor. What subject are you studying today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithTutor(messages.concat(userMsg), input);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-primary-50 p-4 border-b border-primary-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center border border-primary-200">
            <BrainCircuit className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900">ZIVO Tutor</h3>
            <p className="text-xs text-primary-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-100 rounded-2xl rounded-tl-none px-5 py-3 flex items-center space-x-2">
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 px-2"
            placeholder="Ask anything (e.g., 'Explain Photosynthesis')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- NOTES COMPONENT ---
export const Notes: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>('');

  const handleGenerate = async () => {
    if (!topic && !file) return;
    setLoading(true);
    setNote('');
    try {
      const result = await generateNotes(topic, file || undefined);
      setNote(result);
    } catch (error) {
      console.error(error);
      setNote("Sorry, failed to generate notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
            Generator Config
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
              <input 
                type="text" 
                className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring focus:ring-primary-200 p-2 border"
                placeholder="e.g. French Revolution"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or upload image</span>
              </div>
            </div>

            <div>
              <label className="block w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <Upload className="mx-auto w-8 h-8 text-slate-400" />
                <span className="mt-2 block text-sm font-medium text-slate-600">
                  {file ? file.name : "Click to upload textbook page"}
                </span>
              </label>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || (!topic && !file)}
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Notes"}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 h-full min-h-[500px]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
            <h4 className="font-semibold text-slate-700">Generated Notes</h4>
            {note && (
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                <Download className="w-4 h-4 mr-1" /> Export PDF
              </button>
            )}
          </div>
          <div className="p-8 flex-1 overflow-y-auto prose prose-slate max-w-none">
             {note ? (
               <ReactMarkdown>{note}</ReactMarkdown>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <BookOpen className="w-8 h-8 text-slate-300" />
                 </div>
                 <p>Enter a topic or upload an image to generate detailed notes.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PLANNER COMPONENT ---
export const Planner: React.FC = () => {
  const [subjects, setSubjects] = useState('');
  const [hours, setHours] = useState(3);
  const [difficulty, setDifficulty] = useState('Medium');
  const [plan, setPlan] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreatePlan = async () => {
    if (!subjects) return;
    setLoading(true);
    try {
      const result = await generateStudyPlan(subjects, hours, difficulty);
      setPlan(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Create Your Study Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Subjects (comma separated)</label>
            <input 
              type="text" 
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Math, Physics, Chemistry, English"
              className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-200 border p-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hours/Day</label>
            <select 
              value={hours} 
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full rounded-lg border-slate-300 border p-2.5"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(h => <option key={h} value={h}>{h} Hours</option>)}
            </select>
          </div>
          <button 
            onClick={handleCreatePlan}
            disabled={loading || !subjects}
            className="w-full bg-primary-600 text-white rounded-lg py-2.5 font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Designing...' : 'Create Plan'}
          </button>
        </div>
      </div>

      {plan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plan.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
               <div className={`absolute top-0 left-0 w-1 h-full ${
                 item.activity === 'Study' ? 'bg-blue-500' : 
                 item.activity === 'Practice' ? 'bg-green-500' :
                 item.activity === 'Revision' ? 'bg-orange-500' : 'bg-slate-300'
               }`}></div>
               <div className="ml-3">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.day}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.activity === 'Study' ? 'bg-blue-100 text-blue-700' : 
                      item.activity === 'Practice' ? 'bg-green-100 text-green-700' :
                      item.activity === 'Revision' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                    }`}>{item.activity}</span>
                 </div>
                 <h4 className="font-bold text-lg text-slate-800 leading-tight mb-1">{item.subject}</h4>
                 <p className="text-slate-600 text-sm mb-3">{item.topic}</p>
                 <div className="flex items-center text-slate-400 text-xs">
                   <Clock className="w-3 h-3 mr-1" /> {item.duration}
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- EXAM COMPONENT ---
export const Exam: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    setShowResult(false);
    setAnswers({});
    setCurrentQ(0);
    try {
      const qs = await generateQuiz(topic);
      setQuestions(qs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({...prev, [currentQ]: optionIdx}));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 w-full">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-8">You scored <span className="text-primary-600 font-bold text-xl">{score} / {questions.length}</span></p>
          
          <div className="space-y-4 text-left">
            {questions.map((q, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${answers[idx] === q.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className="font-semibold text-slate-800 mb-2">{q.question}</p>
                <p className="text-sm">
                  Your answer: <span className="font-medium">{q.options[answers[idx]]}</span> 
                  {answers[idx] === q.correctAnswer ? ' ✅' : ' ❌'}
                </p>
                {answers[idx] !== q.correctAnswer && (
                  <p className="text-sm text-green-700 mt-1">Correct: {q.options[q.correctAnswer]}</p>
                )}
                <p className="text-xs text-slate-500 mt-2 italic">{q.explanation}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => { setQuestions([]); setShowResult(false); setTopic(''); }}
            className="mt-8 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col justify-center">
      {questions.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <GraduationCap className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Exam Engine</h2>
          <p className="text-slate-500 mb-8">Test your knowledge. Enter a topic to generate a quick quiz.</p>
          
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Organic Chemistry"
              className="flex-1 rounded-xl border-slate-300 focus:ring-primary-500 focus:border-primary-500 p-3 border"
            />
            <button 
              onClick={startQuiz}
              disabled={loading || !topic}
              className="bg-primary-600 text-white px-6 rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Start'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <span className="text-xs font-bold text-slate-400 tracking-wider">QUESTION {currentQ + 1} OF {questions.length}</span>
             <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-bold">{topic}</span>
           </div>
           
           <h3 className="text-xl font-bold text-slate-900 mb-8">{questions[currentQ].question}</h3>
           
           <div className="space-y-3">
             {questions[currentQ].options.map((opt, idx) => (
               <button
                 key={idx}
                 onClick={() => handleAnswer(idx)}
                 className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                   answers[currentQ] === idx 
                     ? 'border-primary-500 bg-primary-50 text-primary-900' 
                     : 'border-slate-100 hover:border-slate-300 text-slate-700'
                 }`}
               >
                 <span className="inline-block w-6 h-6 rounded-full border border-current text-center text-xs leading-6 mr-3 opacity-50">
                   {String.fromCharCode(65 + idx)}
                 </span>
                 {opt}
               </button>
             ))}
           </div>

           <div className="mt-8 flex justify-between">
             <button 
               onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
               disabled={currentQ === 0}
               className="text-slate-400 hover:text-slate-600 disabled:opacity-0"
             >
               Previous
             </button>
             
             {currentQ < questions.length - 1 ? (
               <button 
                 onClick={() => setCurrentQ(prev => prev + 1)}
                 disabled={answers[currentQ] === undefined}
                 className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50 transition-colors"
               >
                 Next
               </button>
             ) : (
               <button 
                 onClick={() => setShowResult(true)}
                 disabled={answers[currentQ] === undefined}
                 className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
               >
                 Finish Quiz
               </button>
             )}
           </div>
        </div>
      )}
    </div>
  );
};

// --- COMMUNITY COMPONENT (UI ONLY) ---
export const Community: React.FC = () => {
  const posts = [
    { id: 1, author: 'Rohan G.', role: 'Student', content: 'Anyone has short notes for Class 12 Physics Chapter 1?', likes: 12, comments: 4, tag: 'Physics' },
    { id: 2, author: 'Priya M.', role: 'Topper', content: 'Just uploaded my mind map for Biology - Heredity. Check it out!', likes: 45, comments: 8, tag: 'Biology' },
    { id: 3, author: 'Amit K.', role: 'Student', content: 'How do you guys manage time between boards and JEE prep?', likes: 28, comments: 15, tag: 'Strategy' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Community</h2>
          <p className="text-slate-500">Discuss, share, and grow together.</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors">
          + New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="flex items-center mb-4">
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                   {post.author[0]}
                 </div>
                 <div className="ml-3">
                   <h4 className="font-bold text-slate-900 text-sm">{post.author}</h4>
                   <span className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{post.role}</span>
                 </div>
                 <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">#{post.tag}</span>
               </div>
               <p className="text-slate-800 mb-4">{post.content}</p>
               <div className="flex items-center space-x-6 text-slate-500 text-sm">
                 <button className="flex items-center hover:text-red-500 transition-colors"><div className="mr-1">❤️</div> {post.likes}</button>
                 <button className="flex items-center hover:text-blue-500 transition-colors"><MessageSquare className="w-4 h-4 mr-1" /> {post.comments}</button>
               </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block space-y-6">
           <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
             <h4 className="font-bold text-slate-800 mb-4">Top Contributors</h4>
             <div className="space-y-3">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center">
                   <div className="w-8 h-8 rounded-full bg-slate-200 mr-3"></div>
                   <div className="flex-1">
                     <div className="h-3 w-20 bg-slate-200 rounded mb-1"></div>
                     <div className="h-2 w-12 bg-slate-100 rounded"></div>
                   </div>
                   <Trophy className="w-4 h-4 text-yellow-500" />
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};