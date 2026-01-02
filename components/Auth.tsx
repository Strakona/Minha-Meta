import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage({ text: 'Verifique seu e-mail para confirmar o cadastro!', type: 'success' });
            }
        } catch (error: any) {
            setMessage({ text: error.message || 'Ocorreu um erro inesperado.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="max-w-md w-full animate-fade-in">
                {/* Logo/Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 transform hover:scale-110 transition-transform duration-300">
                        <span className="material-icons-round text-white text-4xl">rocket_launch</span>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/20 dark:border-white/5">
                    <h2 className="text-3xl font-bold text-center mb-2 text-text-light dark:text-text-dark">
                        {isLogin ? 'Bem-vindo!' : 'Criar Conta'}
                    </h2>
                    <p className="text-center text-subtext-light dark:text-subtext-dark mb-8">
                        {isLogin ? 'Entre para gerenciar suas metas' : 'Comece a economizar hoje mesmo'}
                    </p>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <div className="relative">
                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">mail</span>
                                <input
                                    type="email"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-background-light dark:bg-background-dark/50 border border-transparent focus:border-primary rounded-2xl py-4 pl-12 pr-4 outline-none transition-all duration-200 text-text-light dark:text-text-dark placeholder:text-subtext-light/50"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">lock</span>
                                <input
                                    type="password"
                                    placeholder="Sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-background-light dark:bg-background-dark/50 border border-transparent focus:border-primary rounded-2xl py-4 pl-12 pr-4 outline-none transition-all duration-200 text-text-light dark:text-text-dark placeholder:text-subtext-light/50"
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-2xl text-sm animate-shake ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-success/10 text-success border border-success/20'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Entrar' : 'Cadastrar'}</span>
                                    <span className="material-icons-round">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                            {isLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já tem uma conta? Entre agora'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
