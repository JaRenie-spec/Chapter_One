import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/app/Navbar/Navbar";
import { Footer } from "@/components/app/Footer/Footer";
import { Users, Lock, Calendar } from 'lucide-react'

export default function DemoPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Header/Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-secondary">
                <Navbar />
            </header>

            <main className="flex-1 mt-20">
                {/* Hero Section */}
                <section className="w-full py-24 px-6 text-center bg-summer-extra-soft border-b border-muted">
                    <div className="max-w-4xl mx-auto">
                        <Image
                            src="/Chapter_one.png" // Assurez-vous de placer l'image dans public/
                            alt="Couverture du projet"
                            width={800}
                            height={400}
                            className="mx-auto rounded-xl shadow-lg mb-6"
                        />
                        <h1 className="text-4xl font-bold mb-4 text-primary">
                            Connecter auteurs et lecteurs
                        </h1>
                        <p className="text-lg mb-6 text-primary">
                            Chapter One est une plateforme qui à pour vocation d'aider les auteurs indépendants à publier et vendre leurs oeuvres ainsi qu'à échanger directement avec les lecteurs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/"
                                className="px-6 py-3 rounded-xl font-semibold shadow-soft bg-primary text-primary-foreground hover:opacity-90 transition"
                            >
                                Voir l’application
                            </Link>

                        </div>
                    </div>
                </section>

                {/* Feature Section */}
                <section className="py-24 px-6 bg-background border-b border-muted">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12 text-primary">Fonctionnalités Clés</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                {
                                    title: "Connexion directe",
                                    desc: "Les auteurs peuvent interagir directement avec leurs lecteurs pour créer un lien humain fort.",
                                    icon: Users,
                                },
                                {
                                    title: "Vente sécurisée",
                                    desc: "Téléversez vos livres (PDF, ePub…) et vendez-les avec un intermédiaire unique.",
                                    icon: Lock,
                                },
                                {
                                    title: "Événements interactifs",
                                    desc: "Organisez des discussions, des lectures en live et des lancements de livres virtuels.",
                                    icon: Calendar,
                                },
                            ].map((f, i) => (
                                <div key={i} className="bg-card p-8 rounded-2xl shadow-md flex flex-col items-center transition hover:shadow-lg hover:bg-summer-extra-soft/60">
                                    <f.icon className="h-14 w-14 text-primary mb-4 bg-summer-extra-soft rounded-full p-3 shadow-sm" />
                                    <h3 className="text-xl font-semibold mb-2 text-primary">{f.title}</h3>
                                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-24 px-6 bg-summer-extra-soft">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-primary">À propos du projet</h2>
                        <p className="mb-4 text-base text-muted-foreground">
                            Ce projet est né d’une frustration commune : voir des auteurs talentueux
                            invisibilisés par les grandes plateformes. Avec ce site, nous voulons leur donner
                            les moyens de réussir, humainement et financièrement.
                        </p>
                        <p className="mb-8 text-base text-muted-foreground">
                            Créé par trois étudiants de Holberton School dans le cadre du Portfolio Project :
                            Jean-Alain R., Alexis B., Killian R.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-4">
                            {[
                                { name: "Jean-Alain", github: "https://github.com/JaRenie-spec" },
                                { name: "Alexis", github: "https://github.com/Albat93" },
                                { name: "Killian", github: "https://github.com/KillianRipoche" },
                            ].map((m, i) => (
                                <div key={i} className="text-center">
                                    <p className="font-semibold">{m.name}</p>
                                    <div className="flex gap-2 justify-center mt-2 text-sm text-accent">
                                        <a href={m.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a
                            href="https://github.com/JaRenie-spec/Chapter_One/tree/main" // Remplace par le vrai lien
                            className="underline text-accent"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Voir le dépôt GitHub du projet →
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
