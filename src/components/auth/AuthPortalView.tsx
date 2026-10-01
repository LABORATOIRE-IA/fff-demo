import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useAMS } from '../../context/AMSContext';

const DEMO_CREDENTIALS = {
  identifier: 'Onepoint-FFF.2026',
  password: '2eslmmkk'
};

export const AuthPortalView: React.FC = () => {
  const { navigateTo } = useAMS();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submittedIdentifier = String(formData.get('identifier') || '').trim().toLowerCase();
    const submittedPassword = String(formData.get('password') || '').trim();

    if (
      submittedIdentifier !== DEMO_CREDENTIALS.identifier.toLowerCase() ||
      submittedPassword !== DEMO_CREDENTIALS.password
    ) {
      setHasError(true);
      return;
    }

    setHasError(false);
    navigateTo('connexion');
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl min-h-[560px] grid lg:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/50">
        <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#071b3d] p-10 text-white">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="absolute top-0 right-0 h-2 w-32 bg-[#e31b3d]" />
          <div className="relative z-10">
            <div className="inline-flex rounded-xl bg-white p-2 shadow-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
                alt="Fédération Française de Football"
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>
          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e31b3d]" />
              Fédération Française de Football
            </span>
            <h1 className="text-5xl font-black tracking-tight">AMS 360</h1>
            <p className="max-w-xs text-sm leading-6 text-blue-100/80">
              Performance au cœur du collectif.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3 border-t border-white/15 pt-5 text-[10px] font-semibold uppercase tracking-widest text-blue-200/75">
            <span className="h-5 w-1 bg-[#e31b3d]" />
            Équipe de France
          </div>
        </section>

        <section className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/a/ab/Logo_F%C3%A9d%C3%A9ration_Fran%C3%A7aise_Football_2022.svg"
                alt="Fédération Française de Football"
                className="h-14 w-auto object-contain"
              />
              <span className="h-10 w-px bg-slate-200" />
              <span className="text-xs font-black uppercase tracking-wider text-[#071b3d]">AMS 360</span>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">Portail sécurisé</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Accéder à la plateforme</h2>
              <p className="mt-2 text-sm text-slate-500">Connectez-vous pour continuer.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="portal-identifier" className="block text-xs font-bold text-slate-700">
                  Identifiant
                </label>
                <input
                  id="portal-identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setHasError(false);
                  }}
                  placeholder="Votre identifiant"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="portal-password" className="block text-xs font-bold text-slate-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="portal-password"
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setHasError(false);
                    }}
                    placeholder="Votre mot de passe"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    aria-label={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-slate-900"
                  >
                    {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {hasError && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                  Identifiant ou mot de passe incorrect.
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071b3d] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20"
              >
                <span>Se connecter</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-8 border-t border-slate-100 pt-5 text-center text-[10px] font-medium text-slate-400">
              Fédération Française de Football · AMS 360
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};