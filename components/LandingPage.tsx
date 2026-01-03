import React from 'react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (

        <>
            <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-x-hidden selection:bg-primary selection:text-white">
                {/* Background Gradients */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="material-icons-round text-white text-lg">savings</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Minha Meta</span>
                        </div>
                        <button
                            onClick={onStart}
                            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors px-4 py-2"
                        >
                            Entrar
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative z-10 pt-32 pb-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
                            A Maneira Mais Simples de Poupar
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-400 animate-fade-in-up">
                            Transforme seus sonhos <br /> em realidade.
                        </h1>
                        <p className="text-lg md:text-xl text-subtext-light dark:text-subtext-dark mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Defina sua meta, acompanhe seu progresso e veja suas economias crescerem com nosso sistema visual de slots.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={onStart}
                                className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                            >
                                Começar Agora
                                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <a href="#features" className="text-subtext-light dark:text-subtext-dark font-medium hover:text-primary transition-colors">
                                Ver Como Funciona
                            </a>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="relative z-10 py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest">
                                Passo a Passo
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
                            <p className="text-subtext-light dark:text-subtext-dark">Três passos simples para sua liberdade financeira.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-purple-500/20 to-green-500/20 -z-10"></div>

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center group cursor-default">
                                <div className="w-24 h-24 bg-white dark:bg-surface-dark rounded-full border-4 border-gray-50 dark:border-gray-800 flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 relative z-10">
                                    <span className="material-icons-round text-4xl text-primary">flag</span>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-surface-dark shadow-md">1</div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Defina sua Meta</h3>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark max-w-xs leading-relaxed">
                                    Escolha o valor que deseja juntar e dê um nome para seu sonho.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center group cursor-default">
                                <div className="w-24 h-24 bg-white dark:bg-surface-dark rounded-full border-4 border-gray-50 dark:border-gray-800 flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-300 relative z-10">
                                    <span className="material-icons-round text-4xl text-purple-500">savings</span>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-surface-dark shadow-md">2</div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors">Poupe nos Slots</h3>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark max-w-xs leading-relaxed">
                                    Escolha um valor (slot) disponível que cabe no seu bolso hoje e marque como pago.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center group cursor-default">
                                <div className="w-24 h-24 bg-white dark:bg-surface-dark rounded-full border-4 border-gray-50 dark:border-gray-800 flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 group-hover:border-green-500/30 transition-all duration-300 relative z-10">
                                    <span className="material-icons-round text-4xl text-green-500">emoji_events</span>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-surface-dark shadow-md">3</div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-green-500 transition-colors">Conquiste!</h3>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark max-w-xs leading-relaxed">
                                    Complete todos os slots e realize seu objetivo. O dinheiro é todo seu o tempo todo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visual Demo / Slots Preview */}
                <section className="relative z-10 px-6 mb-32 overflow-hidden">
                    <div className="max-w-4xl mx-auto bg-white/50 dark:bg-surface-dark/50 backdrop-blur-xl rounded-[2.5rem] p-4 md:p-8 shadow-2xl border border-white/20 dark:border-white/5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="h-2 w-1/3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-primary animate-pulse"></div>
                            </div>
                            <span className="text-xs font-bold text-primary">ECONOMIA ATIVA</span>
                            <div className="h-2 w-1/3 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-4 opacity-80">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm transition-all
                  ${i < 12
                                            ? 'bg-success text-white scale-95 opacity-100'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 opacity-60'
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative z-10 py-20 bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Por que usar o Minha Meta?</h2>
                            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-icons-round text-3xl">grid_view</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Sistema de Slots</h3>
                                <p className="text-subtext-light dark:text-subtext-dark leading-relaxed">
                                    Divida sua meta em pequenos passos. Cada slot preenchido é uma vitória no seu caminho financeiro.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2">
                                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-icons-round text-3xl">insights</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Analytics Simples</h3>
                                <p className="text-subtext-light dark:text-subtext-dark leading-relaxed">
                                    Acompanhe o valor total economizado e quanto falta para sua meta em tempo real com gráficos intuitivos.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2">
                                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-icons-round text-3xl">install_mobile</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Experiência PWA</h3>
                                <p className="text-subtext-light dark:text-subtext-dark leading-relaxed">
                                    Instale diretamente no seu aparelho Android ou iPhone e use como um aplicativo nativo, mesmo offline.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-soft border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2">
                                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="material-icons-round text-3xl">notifications_active</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Anti-Procrastinação</h3>
                                <p className="text-subtext-light dark:text-subtext-dark leading-relaxed">
                                    Nosso sistema inteligente te avisa se você perder o ritmo, ajudando você a manter a consistência.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certificate Showcase Section */}
                <section className="relative z-10 py-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black -z-20"></div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10"></div>

                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 text-white">
                        <div className="md:w-1/2 text-center md:text-left">
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                                Recompensa Exclusiva
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                Celebre cada <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Conquista</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Ao atingir sua meta, você recebe um <strong>Certificado Oficial</strong> personalizado.
                                Compartilhe sua vitória nas redes sociais e inspire outros a poupar.
                            </p>
                            <button
                                onClick={onStart}
                                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2 mx-auto md:mx-0"
                            >
                                <span className="material-icons-round">emoji_events</span>
                                Quero meu Certificado
                            </button>
                        </div>

                        <div className="md:w-1/2 relative group perspective-1000">
                            {/* Abstract Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-yellow-500/30 to-purple-600/30 blur-[80px] rounded-full pointer-events-none"></div>

                            {/* Card Mockup */}
                            <div className="relative transform rotate-y-12 rotate-x-6 group-hover:rotate-0 transition-all duration-700 ease-out preserve-3d">
                                <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-1 rounded-3xl shadow-2xl border border-white/10">
                                    <div className="bg-gray-900 rounded-[1.4rem] p-6 flex flex-col items-center text-center relative overflow-hidden h-[400px] w-[320px] mx-auto">
                                        {/* Mock Content */}
                                        <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] bg-primary/20 blur-[60px] rounded-full"></div>
                                        <div className="flex items-center gap-2 mb-8 opacity-70">
                                            <span className="material-icons-round text-primary text-sm">savings</span>
                                            <span className="text-xs font-bold uppercase tracking-widest">Minha Meta</span>
                                        </div>
                                        <div className="text-5xl mb-4 text-yellow-500 drop-shadow-lg">🏆</div>
                                        <h3 className="text-2xl font-black text-white mb-1">META CONCLUÍDA!</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Viagem dos Sonhos</p>
                                        <div className="bg-white/5 w-full py-4 rounded-xl border border-white/5 mb-6">
                                            <p className="text-[10px] text-gray-400">Total Acumulado</p>
                                            <p className="text-2xl font-mono font-bold text-primary">R$ 5.000,00</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-icons-round text-yellow-500 text-xs">star</span>)}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 px-4 py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 animate-bounce cursor-default text-xs">
                                    <span className="material-icons-round text-instagram text-pink-600">share</span>
                                    Pronto para Postar
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative z-10 py-20 px-6 bg-gray-50/50 dark:bg-black/20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                Depoimentos
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Quem usa, recomenda</h2>
                            <div className="flex justify-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-icons-round text-yellow-400">star</span>)}
                            </div>
                            <p className="text-sm text-subtext-light dark:text-subtext-dark">Mais de 5.000 metas realizadas.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: "Ana Silva", role: "Designer", text: "Consegui juntar dinheiro para minha viagem em 3 meses. O sistema de slots vicia de um jeito bom!" },
                                { name: "Carlos Pereira", role: "Estudante", text: "Simples e direto. Não precisa conectar conta bancária, o que me deixa muito mais seguro." },
                                { name: "Mariana Costa", role: "Autônoma", text: "O visual do app me motiva a querer marcar mais um slot verde todo dia. Recomendo muito!" }
                            ].map((t, i) => (
                                <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-lg">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-base text-gray-900 dark:text-white">{t.name}</div>
                                            <div className="text-xs text-subtext-light dark:text-subtext-dark">{t.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 mb-3">
                                        {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-icons-round text-yellow-400 text-sm">star</span>)}
                                    </div>
                                    <p className="text-sm text-subtext-light dark:text-subtext-dark leading-relaxed italic">"{t.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="relative z-10 py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Escolha seu Plano</h2>
                            <p className="text-subtext-light dark:text-subtext-dark">Simples, transparente e direto.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Free Plan */}
                            <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-8 md:p-12 shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold mb-2">Plano Grátis</h3>
                                <div className="text-4xl font-extrabold mb-8">R$ 0</div>
                                <ul className="space-y-4 mb-10 text-subtext-light dark:text-subtext-dark">
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> 1 Meta de Economia</li>
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> Sistema de Slots Completo</li>
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> Histórico de Depósitos</li>
                                </ul>
                                <button
                                    onClick={onStart}
                                    className="w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-2xl transition-all"
                                >
                                    Começar Grátis
                                </button>
                            </div>
                            {/* Premium Plan */}
                            <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-8 md:p-12 shadow-glow border-2 border-primary flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">Recomendado</div>
                                <h3 className="text-xl font-bold mb-2">Plano Premium</h3>
                                <div className="flex items-end gap-1 mb-8">
                                    <span className="text-4xl font-extrabold">R$ 9,90</span>
                                    <span className="text-subtext-light dark:text-subtext-dark text-sm mb-1.5">Pagamento único</span>
                                </div>
                                <ul className="space-y-4 mb-10 text-subtext-light dark:text-subtext-dark text-left w-full">
                                    <li className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                        <span className="material-icons-round text-primary">star</span>
                                        <div>
                                            Múltiplos Sonhos Simultâneos
                                            <p className="text-xs text-subtext-light dark:text-subtext-dark font-normal">Junte para o Carro e Viagem ao mesmo tempo.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> Estatísticas Avançadas</li>
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> Sem Limite de Dispositivos</li>
                                    <li className="flex items-center gap-2"><span className="material-icons-round text-success">check</span> Suporte Prioritário</li>
                                </ul>
                                <div className="w-full mb-6">
                                    <button
                                        onClick={onStart}
                                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        Upgrade para Premium
                                    </button>
                                    <div className="flex justify-center gap-4 mt-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                        <span className="material-icons-round text-gray-400 text-xl" title="Secure">lock</span>
                                        <span className="material-icons-round text-gray-400 text-xl" title="Verified">verified_user</span>
                                        <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center">Garantia de 7 dias</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative z-10 py-20 px-6 bg-gray-50/50 dark:bg-black/20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 text-center text-gray-900 dark:text-white">Dúvidas Frequentes</h2>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold mb-2">O pagamento de R$ 9,90 é mensal?</h4>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark">Não! É pagamento único para liberar todas as funções Premium para sempre em sua conta.</p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold mb-2">Como instalo o app?</h4>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark">Basta clicar em "Adicionar à tela de início" nas opções do seu navegador mobile ou desktop.</p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold mb-2">Meus dados estão seguros?</h4>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark">Sim, utilizamos infraestrutura de segurança de ponta (Supabase) para garantir que seus dados estejam protegidos.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 py-12 px-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <span className="material-icons-round text-white text-xs">savings</span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">Minha Meta</span>
                        </div>
                        <div className="flex gap-6 text-sm text-subtext-light dark:text-subtext-dark">
                            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
                            <a href="#" className="hover:text-primary transition-colors">Termos</a>
                            <a href="#" className="hover:text-primary transition-colors">Contato</a>
                        </div>
                        <p className="text-xs text-subtext-light dark:text-subtext-dark">© 2026 Minha Meta. Feito com foco na sua liberdade financeira.</p>
                    </div>
                </footer>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50 md:hidden animate-fade-in-up">
                <button
                    onClick={onStart}
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    Começar Minha Meta
                    <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
            </div>
        </>
    );

};

export default LandingPage;
