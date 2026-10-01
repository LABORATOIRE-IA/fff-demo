import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAMS } from '../../context/AMSContext';

interface CommentTriggerButtonProps {
  targetId: string;
  targetType?: 'player' | 'match' | 'training' | 'dimension' | 'general';
  targetTitle: string;
  className?: string;
  variant?: 'badge' | 'icon-only' | 'button';
  label?: string;
}

export const CommentTriggerButton: React.FC<CommentTriggerButtonProps> = ({
  targetId,
  targetType = 'player',
  targetTitle,
  className = '',
  variant = 'badge',
  label = 'Notes'
}) => {
  const { comments, openCommentsDrawer } = useAMS();

  // Count existing comments on this specific target
  const targetCommentsCount = comments.filter((c) => c.targetId === targetId).length;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCommentsDrawer({
      targetId,
      targetType,
      targetTitle
    });
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
          targetCommentsCount > 0
            ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 shadow-2xs'
            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
        } ${className}`}
        title={`Commentaires & Notes (${targetCommentsCount})`}
      >
        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
        <span>{label}</span>
        {targetCommentsCount > 0 && (
          <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
            {targetCommentsCount}
          </span>
        )}
      </button>
    );
  }

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleClick}
        className={`p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors relative cursor-pointer ${className}`}
        title={`Commentaires (${targetCommentsCount})`}
      >
        <MessageSquare className="w-4 h-4" />
        {targetCommentsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-2xs">
            {targetCommentsCount}
          </span>
        )}
      </button>
    );
  }

  // Default 'badge' discrete pill
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer border ${
        targetCommentsCount > 0
          ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          : 'bg-slate-100/70 text-slate-500 border-slate-200/80 hover:bg-white hover:text-slate-800'
      } ${className}`}
      title={`Ouvrir les notes (${targetCommentsCount})`}
    >
      <MessageSquare className="w-3 h-3" />
      {targetCommentsCount > 0 ? (
        <span className="font-mono">{targetCommentsCount}</span>
      ) : (
        <span>+</span>
      )}
    </button>
  );
};
