
import React from 'react';
import { VideoLesson } from '../../types';

interface VideoPlayerProps {
  lesson: VideoLesson;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-up">
        <div className="aspect-video">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1`}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-8 flex items-center justify-between border-t border-white/5">
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{lesson.title}</h3>
            <p className="text-neutral-500 text-sm font-medium mt-1">Reproduciendo en Frank.dev Academy</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
