import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { BookOpen, LineChart, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const data = await api.getCourse(parseInt(id));
        setCourse(data);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-8 text-zinc-400">Loading course...</div>;
  if (!course) return <div className="p-8 text-red-400">Course not found.</div>;

  const docs = [
    {
      title: 'Course Outline',
      description: 'Define syllabus, learning outcomes, and assessments.',
      icon: <BookOpen className="w-10 h-10 text-amber-500 mb-4" />,
      link: `/courses/${course.id}/outline`,
      status: course.outline_id ? 'Configured' : 'Empty'
    },
    {
      title: 'CQI Report',
      description: 'Continuous Quality Improvement evaluation.',
      icon: <LineChart className="w-10 h-10 text-blue-500 mb-4" />,
      link: `/courses/${course.id}/cqi`,
      status: course.cqi_id ? 'Configured' : 'Empty'
    },
    {
      title: 'JSU (Table of Specifications)',
      description: 'Jadual Spesifikasi Ujian for assessments.',
      icon: <FileSpreadsheet className="w-10 h-10 text-emerald-500 mb-4" />,
      link: `/courses/${course.id}/jsu`,
      status: course.jsu_id ? 'Configured' : 'Empty'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/programmes" className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-500 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Programmes
      </Link>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <h3 className="text-amber-500 font-mono text-sm mb-2">{course.code}</h3>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">{course.name}</h1>
        <p className="text-zinc-500">Part of: <span className="text-zinc-300 font-medium">{course.programme_name}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docs.map((doc, idx) => (
          <Link key={idx} to={doc.link}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 rounded-xl p-6 h-full transition-colors flex flex-col group cursor-pointer"
            >
              {doc.icon}
              <h2 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-amber-500 transition-colors">{doc.title}</h2>
              <p className="text-zinc-400 text-sm flex-1">{doc.description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-1 rounded ${doc.status === 'Empty' ? 'bg-zinc-700 text-zinc-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {doc.status}
                </span>
                <span className="text-sm font-semibold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit &rarr;
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
