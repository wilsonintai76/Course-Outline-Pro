import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { Plus, GraduationCap, ChevronRight, Folder, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

export default function Programmes() {
  const { user } = useOutletContext<{ user: any }>();
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showProgForm, setShowProgForm] = useState(false);
  const [progName, setProgName] = useState('');
  const [progCode, setProgCode] = useState('');
  const [progDept, setProgDept] = useState<number | ''>('');
  const [departments, setDepartments] = useState<any[]>([]);

  const [showCourseForm, setShowCourseForm] = useState<number | null>(null);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCoordinator, setCourseCoordinator] = useState<number | ''>('');

  const fetchData = async () => {
    setLoading(true);
    const promises: any[] = [api.listProgrammes(), api.listCourses(), api.listDepartments()];
    if (user?.is_superuser || user?.permissions?.includes('can_manage_courses')) {
      promises.push(api.listUsers());
    }
    const [p, c, d, u] = await Promise.all(promises);
    setProgrammes(p);
    setCourses(c);
    setDepartments(d);
    if (u) setUsers(u);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!progDept) {
      alert("Please select a department.");
      return;
    }
    await api.createProgramme({ department: Number(progDept), name: progName, code: progCode });
    setProgName('');
    setProgCode('');
    setProgDept('');
    setShowProgForm(false);
    fetchData();
  };

  const handleCreateCourse = async (e: React.FormEvent, progId: number) => {
    e.preventDefault();
    const data: any = { programme: progId, name: courseName, code: courseCode };
    if (courseCoordinator) {
      data.coordinator = Number(courseCoordinator);
    }
    await api.createCourse(data);
    setCourseName('');
    setCourseCode('');
    setCourseCoordinator('');
    setShowCourseForm(null);
    fetchData();
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading workspace...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-amber-500" />
            Programmes & Courses
          </h1>
          <p className="text-zinc-400 mt-2">Manage your academic structures and dive into course content.</p>
        </div>
        <button 
          onClick={() => setShowProgForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Programme
        </button>
      </div>

      {showProgForm && (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreateProgramme} 
          className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-8 flex gap-4 items-end shadow-xl flex-wrap"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Department</label>
            <select 
              required value={progDept} onChange={e => setProgDept(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none"
            >
              <option value="" disabled>Select Department</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Programme Code</label>
            <input 
              required value={progCode} onChange={e => setProgCode(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none"
              placeholder="e.g. CS101"
            />
          </div>
          <div className="flex-[2] min-w-[250px]">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Programme Name</label>
            <input 
              required value={progName} onChange={e => setProgName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none"
              placeholder="e.g. Bachelor of Computer Science"
            />
          </div>
          <div className="flex gap-2 w-full justify-end mt-2">
            <button type="button" onClick={() => setShowProgForm(false)} className="px-4 py-2 rounded text-zinc-400 hover:bg-zinc-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-amber-500 text-black font-bold hover:bg-amber-600">Save</button>
          </div>
        </motion.form>
      )}

      <div className="space-y-6">
        {programmes.map(prog => (
          <div key={prog.id} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-zinc-800 p-5 border-b border-zinc-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Folder className="w-6 h-6 text-amber-500/80" />
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">{prog.name}</h2>
                  <span className="text-xs text-amber-500/80 font-mono bg-amber-500/10 px-2 py-0.5 rounded">{prog.code}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowCourseForm(prog.id)}
                className="text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </div>

            {showCourseForm === prog.id && (
              <form onSubmit={(e) => handleCreateCourse(e, prog.id)} className="p-4 bg-zinc-800/80 border-b border-zinc-700 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[120px]">
                  <input required value={courseCode} onChange={e => setCourseCode(e.target.value)} placeholder="Course Code" className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none text-sm" />
                </div>
                <div className="flex-[2] min-w-[200px]">
                  <input required value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="Course Name" className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none text-sm" />
                </div>
                {(user?.is_superuser || user?.permissions?.includes('can_manage_courses')) && (
                  <div className="flex-1 min-w-[150px]">
                    <select value={courseCoordinator} onChange={e => setCourseCoordinator(e.target.value ? Number(e.target.value) : '')} className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100 focus:border-amber-500 outline-none text-sm">
                      <option value="">Auto Assign (Self)</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.username}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowCourseForm(null)} className="px-3 py-2 text-sm rounded text-zinc-400 hover:bg-zinc-700">Cancel</button>
                  <button type="submit" className="px-3 py-2 text-sm rounded bg-amber-500 text-black font-bold">Save</button>
                </div>
              </form>
            )}

            <div className="p-2">
              {courses.filter(c => c.programme === prog.id).length === 0 ? (
                <div className="text-sm text-zinc-500 p-4 text-center">No courses in this programme yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  {courses.filter(c => c.programme === prog.id).map(course => (
                    <Link 
                      key={course.id} 
                      to={`/courses/${course.id}`}
                      className="group bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 p-4 rounded-lg flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="text-xs font-mono text-zinc-500 mb-1 flex items-center gap-2">
                          {course.code}
                          {course.coordinator_name && (
                            <span className="flex items-center gap-1 bg-zinc-800 px-1.5 py-0.5 rounded-sm">
                              <User className="w-3 h-3" />
                              {course.coordinator_name}
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-zinc-200 group-hover:text-amber-500 transition-colors">{course.name}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {programmes.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
            No programmes found. Create your first academic programme to get started.
          </div>
        )}
      </div>
    </div>
  );
}
