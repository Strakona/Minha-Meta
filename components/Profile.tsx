import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import { useSavings } from '../context';

interface MenuItemProps {
  icon: string;
  label: string;
  sublabel?: string;
  isDestructive?: boolean;
  hasToggle?: boolean;
  isToggleActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  sublabel,
  isDestructive = false,
  hasToggle = false,
  isToggleActive = false,
  onClick
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100 dark:active:bg-gray-700"
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${isDestructive ? 'bg-red-100 dark:bg-red-900/20 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
        <span className="material-icons-round text-xl">{icon}</span>
      </div>
      <div className="text-left">
        <span className={`block font-medium ${isDestructive ? 'text-red-500' : 'text-text-light dark:text-text-dark'}`}>{label}</span>
        {sublabel && <span className="text-xs text-subtext-light dark:text-subtext-dark">{sublabel}</span>}
      </div>
    </div>

    {hasToggle ? (
      <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 cursor-pointer ${isToggleActive ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${isToggleActive ? 'right-1' : 'left-1'}`}></div>
      </div>
    ) : (
      <span className="material-icons-round text-gray-300 dark:text-gray-600">chevron_right</span>
    )}
  </button>
);

const Profile: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, profile, signOut, upgradeToPremium } = useSavings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || 'Investidor Focado');
  const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem('user_avatar') || null);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  // Persist name changes
  useEffect(() => {
    localStorage.setItem('user_name', userName);
  }, [userName]);

  // Persist avatar changes
  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem('user_avatar', userAvatar);
    }
  }, [userAvatar]);

  const handleEditClick = () => {
    setEditName(userName);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      setUserName(editName);
      setIsEditing(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Limit file size to 2MB to prevent localStorage issues
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUserAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full pb-8">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Perfil</h1>
          <button
            onClick={handleEditClick}
            className="text-primary text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Editar Nome
          </button>
        </div>
      </header>

      <div className="px-4 pt-6 space-y-6">
        {/* User Card */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft flex flex-col items-center text-center relative overflow-hidden transition-colors duration-200">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-purple-500/20"></div>

          {/* Avatar Section */}
          <div className="relative z-10 w-24 h-24 mb-3 mt-4 group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-full h-full rounded-full bg-white dark:bg-surface-dark p-1 shadow-md transition-colors duration-200 overflow-hidden relative">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden relative">
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-icons-round text-4xl text-gray-400">person</span>
                )}

                {/* Overlay for hover/edit indication */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="material-icons-round text-white text-2xl">photo_camera</span>
                </div>
              </div>
            </div>
            {/* Online Status Dot */}
            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-surface-dark z-20"></div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h2 className="text-xl font-bold text-text-light dark:text-text-dark">{userName}</h2>
          <p className="text-subtext-light dark:text-subtext-dark text-sm mb-4">{user?.email || 'Nenhum e-mail vinculado'}</p>

          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            <div className="bg-background-light dark:bg-background-dark p-3 rounded-xl transition-colors duration-200">
              <p className="text-xs text-subtext-light dark:text-subtext-dark">ID</p>
              <p className="font-bold text-primary truncate max-w-[80px] text-[10px]">{user?.id?.substring(0, 8)}...</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-3 rounded-xl transition-colors duration-200">
              <p className="text-xs text-subtext-light dark:text-subtext-dark">Plano</p>
              <p className={`font-bold ${profile?.plan === 'premium' ? 'text-purple-500' : 'text-orange-500'} capitalize`}>
                {profile?.plan || 'Gratuito'}
              </p>
            </div>
          </div>

          {profile?.plan === 'free' && (
            <button
              onClick={() => {
                if (window.confirm("Deseja simular o upgrade para o Plano Premium e criar metas ilimitadas?")) {
                  upgradeToPremium();
                }
              }}
              className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-primary text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="material-icons-round text-lg animate-pulse">auto_awesome</span>
              Upgrade para Premium
            </button>
          )}
        </div>

        {/* Settings Group 1 */}
        <div>
          <h3 className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-3 px-1">Geral</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft overflow-hidden transition-colors duration-200">
            <MenuItem icon="notifications" label="Notificações" hasToggle sublabel="Alertas de depósito" />
            <MenuItem
              icon="dark_mode"
              label="Tema Escuro"
              hasToggle
              isToggleActive={isDarkMode}
              onClick={toggleTheme}
            />
            <MenuItem icon="language" label="Idioma" sublabel="Português (BR)" />
          </div>
        </div>

        {/* Settings Group 2 */}
        <div>
          <h3 className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-3 px-1">Dados & Segurança</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft overflow-hidden transition-colors duration-200">
            <MenuItem icon="cloud_download" label="Exportar CSV" />
            <MenuItem icon="lock" label="Privacidade" />
            <MenuItem icon="help" label="Ajuda e Suporte" />
          </div>
        </div>

        {/* Logout */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft overflow-hidden mt-4 transition-colors duration-200">
          <MenuItem
            icon="logout"
            label="Sair da Conta"
            isDestructive
            onClick={() => {
              if (window.confirm('Tem certeza que deseja sair?')) {
                signOut();
              }
            }}
          />
        </div>

        <p className="text-center text-xs text-subtext-light dark:text-subtext-dark py-6 opacity-60">
          Versão 1.0.2 • Build 2026
        </p>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Editar Perfil</h2>
              <button onClick={() => setIsEditing(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-1">Nome de Exibição</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  autoFocus
                  placeholder="Seu nome"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!editName.trim()}
                  className="w-full py-4 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;