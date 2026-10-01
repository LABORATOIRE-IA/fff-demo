import React, { useState } from 'react';
import { useAMS } from '../../context/AMSContext';
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Clock,
  User,
  Filter,
  Reply,
  Trash2,
  Tag,
  Check,
  Sparkles
} from 'lucide-react';
import { CollaborativeComment } from '../../types/ams';

interface CollaborativeCommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTargetId?: string;
  defaultTargetType?: 'player' | 'match' | 'training' | 'dimension' | 'general';
  defaultTargetTitle?: string;
}

export const CollaborativeCommentsDrawer: React.FC<CollaborativeCommentsDrawerProps> = ({
  isOpen,
  onClose,
  defaultTargetId,
  defaultTargetType,
  defaultTargetTitle
}) => {
  const {
    comments,
    addComment,
    addCommentReply,
    toggleResolveComment,
    deleteComment,
    roleConfig,
    selectedPlayer,
    selectedMatch
  } = useAMS();

  // Filters
  const [filterMode, setFilterMode] = useState<'current' | 'all'>('current');
  const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false);

  // New comment state
  const [newContent, setNewContent] = useState('');
  const [newSubSection, setNewSubSection] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  if (!isOpen) return null;

  // Determine current active target
  const currentTargetId = defaultTargetId || selectedPlayer?.id || 'dupont';
  const currentTargetType = defaultTargetType || 'player';
  const currentTargetTitle = defaultTargetTitle || selectedPlayer?.name || 'Mathis Dupont';

  // Filtered comments
  const filteredComments = comments.filter((c) => {
    if (filterMode === 'current') {
      const matchId = c.targetId === currentTargetId;
      if (!matchId) return false;
    }
    if (showOnlyUnresolved && c.resolved) {
      return false;
    }
    return true;
  });

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    addComment({
      targetType: currentTargetType,
      targetId: currentTargetId,
      targetTitle: currentTargetTitle,
      subSection: newSubSection.trim() || undefined,
      authorName: roleConfig.userName,
      authorRole: roleConfig.title,
      content: newContent.trim()
    });

    setNewContent('');
    setNewSubSection('');
  };

  const handleSendReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    addCommentReply(commentId, {
      authorName: roleConfig.userName,
      authorRole: roleConfig.title,
      content: replyContent.trim()
    });

    setReplyContent('');
    setReplyingToId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/30 backdrop-blur-2xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Drawer Panel */}
      <aside className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  Notes & Commentaires
                </h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {comments.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Partage collaboratif en temps réel pour le staff FFF
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls (PowerPoint Style) */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setFilterMode('current')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                filterMode === 'current'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sur cet élément
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tout ({comments.length})
            </button>
          </div>

          <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlyUnresolved}
              onChange={(e) => setShowOnlyUnresolved(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
            />
            <span>Non résolus</span>
          </label>
        </div>

        {/* Target Info Pill */}
        {filterMode === 'current' && (
          <div className="px-4 py-2 bg-blue-50/60 border-b border-blue-100 text-xs flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                Cible :
              </span>
              <span className="font-bold text-slate-900 truncate">
                {currentTargetTitle}
              </span>
            </div>
            <span className="text-[10px] font-mono text-blue-600 font-bold shrink-0">
              {filteredComments.length} note(s)
            </span>
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {filteredComments.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">Aucun commentaire pour le moment.</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Ajoutez une note ci-dessous pour lancer l'échange avec les autres membres du staff.
              </p>
            </div>
          ) : (
            filteredComments.map((comm) => (
              <div
                key={comm.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  comm.resolved
                    ? 'bg-slate-50/80 border-slate-200/60 opacity-75'
                    : 'bg-white border-slate-200 shadow-xs hover:border-blue-300'
                }`}
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {comm.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{comm.authorName}</span>
                        {comm.resolved && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Résolu
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="font-semibold text-blue-700">{comm.authorRole}</span>
                        <span>•</span>
                        <span>{comm.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Resolve / Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleResolveComment(comm.id)}
                      className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                        comm.resolved
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                      }`}
                      title={comm.resolved ? 'Marquer comme non résolu' : 'Marquer comme résolu'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteComment(comm.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Supprimer la note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Target context badge if viewing 'all' */}
                {filterMode === 'all' && (
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
                      {comm.targetTitle}
                    </span>
                    {comm.subSection && <span>› {comm.subSection}</span>}
                  </div>
                )}

                {/* SubSection tag if present */}
                {comm.subSection && filterMode === 'current' && (
                  <div className="mb-1 text-[10px] font-bold text-blue-700 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{comm.subSection}</span>
                  </div>
                )}

                {/* Content */}
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  {comm.content}
                </p>

                {/* Replies Thread */}
                {comm.replies && comm.replies.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2 pl-3 border-l-2 border-blue-200">
                    {comm.replies.map((rep) => (
                      <div key={rep.id} className="text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="font-bold text-slate-900">{rep.authorName}</span>
                          <span className="text-slate-400 font-semibold">({rep.authorRole})</span>
                          <span className="text-slate-400">• {rep.createdAt}</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-snug">{rep.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input or Trigger */}
                <div className="mt-2 pt-1 flex items-center justify-between">
                  {replyingToId === comm.id ? (
                    <div className="w-full mt-1 space-y-1.5">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Répondre à cette note..."
                          className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendReply(comm.id);
                          }}
                        />
                        <button
                          onClick={() => handleSendReply(comm.id)}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                        >
                          Envoyer
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyContent('');
                        }}
                        className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingToId(comm.id)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Reply className="w-3 h-3" />
                      <span>Répondre</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input Box (Docked at bottom) */}
        <form onSubmit={handleCreateComment} className="p-3.5 border-t border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-600 font-bold">
              <span>Auteur :</span>
              <span className="text-blue-700 font-extrabold">{roleConfig.userName}</span>
              <span className="text-slate-400 font-normal">({roleConfig.title})</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Ctrl + Entrée</span>
          </div>

          <input
            type="text"
            value={newSubSection}
            onChange={(e) => setNewSubSection(e.target.value)}
            placeholder="Thématique (ex: Vitesse, Ischios, Tactique...)"
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
          />

          <div className="relative">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={`Écrire une note sur ${currentTargetTitle}...`}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 resize-none pr-10"
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  handleCreateComment(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!newContent.trim()}
              className="absolute right-2 bottom-3 p-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
              title="Publier la note"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};
