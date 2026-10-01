import React from 'react';
import { useAMS } from '../../context/AMSContext';
import { UPCOMING_MATCH } from '../../data/upcomingMatch';
import {
  Stethoscope,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Lock,
  MessageSquare,
  ArrowRight,
  Shield,
  Activity,
  Heart,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { COMPREHENSIVE_MEDICAL_RECORDS } from '../../data/medicalRecordsData';

export const MedicalStaffDashboard: React.FC = () => {
  const {
    players,
    openMedicalModal,
    openCommentsDrawer,
    navigateTo,
    notifications,
    handleNotificationClick
  } = useAMS();

  // Filter players under surveillance or progressive return
  const playersUnderCare = players.filter(
    (p) => p.status === 'a_surveiller' || p.status === 'retour_progressif' || p.status === 'indisponible'
  );

  // Medical notifications or notes tagging the doctor
  const medicalNotifications = notifications.filter(
    (n) => n.type === 'medical_alert' || n.type === 'mention' || n.type === 'new_note'
  );

  // Medical schedule for the day
  const medicalSchedule = [
    {
      time: '08:30 - 09:15',
      title: 'Bilan matinal, pesée & questionnaires réveil / courbatures',
      location: 'Salle Médicale du Château • 24 joueurs',
      category: 'Routine',
      status: 'Terminé',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      time: '10:15 - 11:00',
      title: 'Soins & thérapie manuelle : Mathis Dupont (Ischios D)',
      location: 'Table 2 • Protocole excentrique & mobilité',
      category: 'Soins Joueur',
      status: 'En cours',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      playerId: 'dupont'
    },
    {
      time: '11:30 - 12:15',
      title: 'Échographie musculo-squelettique de contrôle : Adrien Rabiot',
      location: 'Pôle Imagerie Clairefontaine • Suivi soléaire G',
      category: 'Examen',
      status: 'À venir',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      playerId: 'rabiot'
    },
    {
      time: '14:30 - 15:15',
      title: 'Point d’aptitude staff technique avec Zinédine Zidane',
      location: 'Bureau Sélectionneur • Validation temps de jeu match',
      category: 'Staff Technique',
      status: 'À venir',
      statusColor: 'bg-slate-50 text-slate-700 border-slate-200'
    },
    {
      time: '18:00 - 19:30',
      title: 'Protocoles de récupération post-entraînement (Bains 10°C, cryo, drainage)',
      location: 'Espace Balnéothérapie & Soins',
      category: 'Récupération',
      status: 'À venir',
      statusColor: 'bg-slate-50 text-slate-700 border-slate-200'
    }
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      date: 'Aujourd’hui 11:30',
      patient: 'Adrien Rabiot',
      type: 'Échographie soléaire',
      doctor: 'Dr. Franck Le Gall',
      room: 'Salle Échographie 1',
      priority: 'Haute'
    },
    {
      date: 'Demain 09:15',
      patient: 'Mathis Dupont',
      type: 'Test isocinétique Cybex (Ratio I/Q)',
      doctor: 'Dr. Franck Le Gall & Kinésithérapeute',
      room: 'Laboratoire Biomécanique',
      priority: 'Normale'
    },
    {
      date: 'Demain 14:00',
      patient: 'Kylian Mbappé',
      type: 'Contrôle proprioception cheville',
      doctor: 'Kiné Référent FFF',
      room: 'Salle de réathlétisation',
      priority: 'Normale'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. ESPACE MAJEUR OBJECTIFS STAFF MÉDICAL : 3 MODULES D'AIDE À LA DÉCISION  */}
      {/* ========================================================================= */}
      <div className="space-y-3.5">
        {/* Module 1 : Préparer la prochaine rencontre */}
        <div
          aria-disabled="true"
          className="relative bg-gradient-to-r from-[#061e1c] via-[#0b3834] to-[#041210] text-white p-5 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-xl overflow-hidden group opacity-80"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-3 max-w-3xl">
              {/* Top tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>OBJECTIFS STAFF MÉDICAL • DÉCISION CLINIQUE AVANT-MATCH</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-200 bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-700/50">
                  {UPCOMING_MATCH.title} • {UPCOMING_MATCH.countdown} • {UPCOMING_MATCH.dateTime}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>Préparer la prochaine rencontre (Diagnostic & Risques)</span>
                  <span className="hidden sm:inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Disponibilité 94.2%
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1 leading-relaxed">
                  Diagnostic complet de l'état de santé des 24 joueurs, matrice de prédiction des risques de blessure et recommandations médicales officielles transmises au sélectionneur Zinédine Zidane.
                </p>
              </div>

              {/* 3 Quick Data Pillars */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-[11px] font-mono text-emerald-200">
                <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>20 joueurs aptes à 100% • 3 à surveiller</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Temps de jeu régulés (Mbappé, Rabiot)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Protocoles vestiaires J-0 & mi-temps</span>
                </div>
              </div>
            </div>

            {/* Large CTA Button */}
            <div className="shrink-0 flex items-center">
              <button
                disabled
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-500 text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg cursor-not-allowed"
              >
                <span>Préparer le Match (Santé)</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Modules 2 & 3 : 2 Grands Bandeaux Juxtaposés (Agenda 2 mois + Plan Mbappé) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Module 2 : Préparer mon agenda sur les deux prochains mois */}
          <div
            aria-disabled="true"
            className="relative bg-gradient-to-br from-[#091b3d] via-[#071530] to-[#030a17] text-white p-5 rounded-3xl border border-blue-700/30 shadow-lg overflow-hidden group opacity-80 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-blue-200 bg-blue-950/90 px-2.5 py-0.5 rounded-full border border-blue-600/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>OBJECTIFS STAFF MÉDICAL • AGENDA SUR 2 MOIS</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Oct — Nov 2026
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Préparer mon agenda sur les 2 prochains mois</span>
                </h3>
                <p className="text-xs text-blue-100/80 font-medium mt-1 leading-relaxed">
                  Prédiction des pics de blessure sur 8 semaines, anticipation des besoins de soins masso-kinésithérapiques et réserve d'urgences.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-800/50 font-mono text-[10.5px]">
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Prévision</span>
                  <strong className="text-white text-xs">8 semaines</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Soins Kiné</span>
                  <strong className="text-blue-300 text-xs">198h prévues</strong>
                </div>
                <div className="bg-blue-950/50 p-2 rounded-xl border border-blue-800/40">
                  <span className="text-[9px] text-blue-300 block uppercase">Réserve Urgence</span>
                  <strong className="text-amber-300 text-xs">14h / sem.</strong>
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-blue-200 font-mono">
                3 RDV spécialistes • Dépistage LDC
              </span>
              <button
                disabled
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-3.5 py-2 bg-slate-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-not-allowed"
              >
                <span>Planifier l'Agenda</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module 3 : Plan sur-mesure Kylian Mbappé (Médical) */}
          <div
            onClick={() => navigateTo('ai_strategy_medical_mbappe')}
            className="relative bg-gradient-to-br from-[#280914] via-[#1a060d] to-[#0d0307] text-white p-5 rounded-3xl border border-rose-700/50 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-rose-400/60 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-rose-300 bg-rose-950/90 px-2.5 py-0.5 rounded-full border border-rose-400/40 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span>OBJECTIFS STAFF MÉDICAL • PLAN SOINS SUR-MESURE</span>
                </span>
                <span className="text-[10px] font-mono text-rose-300 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                  Genou Droit (LLI)
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Plan sur-mesure • Kylian Mbappé (#10)</span>
                </h3>
                <p className="text-xs text-rose-100/80 font-medium mt-1 leading-relaxed">
                  Programme de rééducation individualisé, suivi de l'imagerie IRM/Écho et jalons médicaux interactifs.
                </p>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-800/50 font-mono text-[10.5px]">
                <div className="bg-rose-950/50 p-2 rounded-xl border border-rose-800/40">
                  <span className="text-[9px] text-rose-300 block uppercase">Imagerie</span>
                  <strong className="text-emerald-300 text-xs">Résorption 85%</strong>
                </div>
                <div className="bg-rose-950/50 p-2 rounded-xl border border-rose-800/40">
                  <span className="text-[9px] text-rose-300 block uppercase">Douleur EVA</span>
                  <strong className="text-emerald-300 text-xs">1 / 10</strong>
                </div>
                <div className="bg-rose-950/50 p-2 rounded-xl border border-rose-800/40">
                  <span className="text-[9px] text-rose-300 block uppercase">Temps Jeu</span>
                  <strong className="text-white text-xs">60-70 min max</strong>
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-rose-200 font-mono">
                Suivi biquotidien • Protocole Dr. Le Gall
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('ai_strategy_medical_mbappe');
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs group-hover:scale-105 cursor-pointer"
              >
                <span>Gérer les Soins</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Emploi du Temps + Notes où le médecin est tagué */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLONNE GAUCHE (7/12) : EMPLOI DU TEMPS DU JOUR DU MÉDECIN */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Emploi du Temps du Jour • Staff Médical
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              Lundi 28 Septembre
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {medicalSchedule.map((slot, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-rose-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-black text-rose-700">{slot.time}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${slot.statusColor}`}>
                      {slot.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{slot.title}</h4>
                  <p className="text-[10.5px] text-slate-500 font-medium">{slot.location}</p>
                </div>

                {slot.playerId && (
                  <button
                    onClick={() => openMedicalModal(slot.playerId)}
                    className="self-start sm:self-auto px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 hover:border-rose-300 rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>Fiche Joueur</span>
                    <Lock className="w-3 h-3 text-rose-500" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Permanence médicale assurée 24h/24 au Centre Médical FFF</span>
            <span className="font-mono text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Astreinte active
            </span>
          </div>
        </div>

        {/* COLONNE DROITE (5/12) : DERNIÈRES NOTES OÙ LE MÉDECIN EST TAGUÉ */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Notes & Mentions pour le Dr. Le Gall
              </h3>
            </div>
            <button
              onClick={() => openCommentsDrawer()}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Toutes les notes →
            </button>
          </div>

          <div className="space-y-2.5 flex-1">
            {medicalNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className="p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/90 transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-900 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-blue-600" />
                    <span>{notif.authorName || 'Staff Technique'}</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">{notif.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {notif.title}
                </h4>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-blue-600">
                  <span>Cliquez pour répondre à la note</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => openCommentsDrawer()}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Ouvrir le panneau collaboratif des notes</span>
          </button>
        </div>
      </div>

      {/* Grid: Prochains RDV & Joueurs sous surveillance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* PROCHAINS RDV MÉDICAUX (5/12) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Prochains Rendez-vous & Examens
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              3 programmés
            </span>
          </div>

          <div className="space-y-2">
            {upcomingAppointments.map((apt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-700">{apt.date}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    {apt.priority}
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-900">{apt.patient}</h4>
                <div className="text-[11px] text-slate-600 font-medium">{apt.type}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono">
                  <span>{apt.room}</span>
                  <span>{apt.doctor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JOUEURS À SURVEILLER & PROTOCOLES DE REPRISE (7/12) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Joueurs sous Surveillance & Protocoles Actifs
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {playersUnderCare.length} joueurs concernés
            </span>
          </div>

          <div className="space-y-2.5">
            {playersUnderCare.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-amber-50/40 border border-amber-200/70 hover:border-amber-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {p.name} #{p.number}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">({p.position})</span>
                    <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {p.status === 'a_surveiller' ? 'À surveiller' : 'Retour progressif'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 leading-snug">
                    {p.id === 'dupont'
                      ? 'Échographie négative. Ischios D à 85% d’aptitude. Temps de jeu recommandé : 60-75 min.'
                      : p.id === 'rabiot'
                      ? 'Soléaire G en régénération. Séances de courses individualisées validées à 24 km/h.'
                      : 'Contusion cheville droite en voie de résorption complète. Apte banc.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openMedicalModal(p.id)}
                    className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Dossier Secret</span>
                    <Lock className="w-3 h-3 text-rose-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('joueur_360', { playerId: p.id })}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Jumeau 360°
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
