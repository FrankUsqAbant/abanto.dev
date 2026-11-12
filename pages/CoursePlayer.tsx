import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MOCK_COURSES } from "../content/mockCourses";
import { motion, AnimatePresence } from "framer-motion";

const CoursePlayer: React.FC = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const course = courseId ? MOCK_COURSES[courseId] : null;

  // Load progress
  useEffect(() => {
    if (courseId) {
      const saved = localStorage.getItem(`course_${courseId}_progress`);
      if (saved) {
        setCompletedVideos(JSON.parse(saved));
      }
    }
  }, [courseId]);

  const handleMarkComplete = (vidId: string) => {
    if (!completedVideos.includes(vidId)) {
      const newCompleted = [...completedVideos, vidId];
      setCompletedVideos(newCompleted);
      localStorage.setItem(
        `course_${courseId}_progress`,
        JSON.stringify(newCompleted)
      );
    }
  };

  // Redirect if no course or no videoId
  useEffect(() => {
    if (!course) {
      // navigate("/courses"); // Commented out for now to prevent loops if data missing
      return;
    }
    if (!videoId && course.videos.length > 0) {
      navigate(`/courses/${courseId}/learn/${course.videos[0].id}`, {
        replace: true,
      });
    }
  }, [course, videoId, navigate, courseId]);

  if (!course)
    return (
      <div className="p-20 text-center text-white">Curso no encontrado</div>
    );

  const currentVideo =
    course.videos.find((v) => v.id === videoId) || course.videos[0];
  const isCompleted = completedVideos.includes(currentVideo.id);
  const progress = Math.round(
    (completedVideos.length / course.videos.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-['Inter']">
      {/* Header / Nav */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-4 lg:px-8 z-20 relative">
        <div className="flex items-center gap-4">
          <Link
            to="/courses"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Volver al Catálogo</span>
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <h1 className="font-bold text-sm sm:text-lg truncate max-w-[200px] sm:max-w-md">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-neutral-400 mb-1">
              Tu Progreso: {progress}%
            </span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Video Column (Left/Top) */}
        <div className="flex-1 bg-black flex flex-col relative">
          {/* Video Container - 16:9 Aspect Ratio */}
          <div className="w-full aspect-video bg-black relative shadow-lg shadow-cyan-500/5 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={currentVideo.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info (Below Player) */}
          <div className="p-6 lg:p-10 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                {currentVideo.title}
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                En esta lección aprenderemos los conceptos fundamentales
                cubiertos en este video.
                {/* Placeholder description */}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleMarkComplete(currentVideo.id)}
                  className={`px-6 py-2 border rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    isCompleted
                      ? "bg-green-500/10 border-green-500/50 text-green-400"
                      : "bg-white/5 hover:bg-white/10 border-white/10"
                  }`}
                >
                  <i
                    className={`fas ${
                      isCompleted ? "fa-check-circle" : "fa-check"
                    }`}
                  ></i>
                  {isCompleted ? "Visto" : "Marcar como Visto"}
                </button>
                <button className="px-6 py-2 bg-transparent hover:bg-white/5 border border-white/10 rounded-lg text-sm font-bold transition-all text-neutral-400 hover:text-white">
                  <i className="fas fa-share mr-2"></i>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Column (Right/Bottom) */}
        <div className="w-full lg:w-96 bg-[#0a0a0a] border-l border-white/5 flex flex-col h-[50vh] lg:h-auto">
          <div className="p-6 border-b border-white/5 bg-[#0e0e0e]">
            <h3 className="font-bold text-lg">Contenido del Curso</h3>
            <p className="text-xs text-neutral-500 mt-1">
              {course.videos.length} Lecciones •{" "}
              {course.videos.reduce((acc, v) => acc + parseInt(v.duration), 0)}{" "}
              min total
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {course.videos.map((video, idx) => {
              const isActive = video.id === currentVideo.id;
              return (
                <Link
                  key={video.id}
                  to={`/courses/${courseId}/learn/${video.id}`}
                  className={`block p-4 rounded-xl border transition-all duration-300 group ${
                    isActive
                      ? "bg-cyan-500/5 border-cyan-500/50 shadow-[inset_4px_0_0_0_#06b6d4]"
                      : "bg-[#111] border-white/5 hover:border-white/20 hover:bg-[#161616]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-cyan-400" : "text-neutral-600"
                      }`}
                    >
                      LECCIÓN {idx + 1}
                    </span>
                    {/* Status Icon */}
                    {completedVideos.includes(video.id) ? (
                      <i className="fas fa-check-circle text-green-500 text-xs"></i>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/20"></div>
                    )}
                  </div>
                  <h4
                    className={`font-medium text-sm mb-1 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-300 group-hover:text-white"
                    }`}
                  >
                    {video.title}
                  </h4>
                  <span className="text-xs text-neutral-600 font-mono">
                    {video.duration}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
