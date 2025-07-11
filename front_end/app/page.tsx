import { Navbar } from "@/components/app/Navbar/Navbar";
import { Footer } from "@/components/app/Footer/Footer";
import HeroSection from "@/components/app/HeroSection/HeroSection";
import WriterCarouselVertical from "@/components/app/WriterCarouselVertical/WriterCarouselVertical";
import BookCarouselHorizontal from "@/components/app/BookCarouselHorizontal/BookCarouselHorizontal";
import EventCarouselVertical from "@/components/app/EventCarouselVertical/EventCarouselVertical";
import RecommendedCarousel from "@/components/app/RecommendedCarousel/RecommendedCarousel";
import { CategoryGrid } from "@/components/app/CategoryGrid/CategoryGrid";
import BookSearch from "./search/BookSearch";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
            <header className="fixed top-0 left-0 w-full z-50" style={{ background: 'var(--primary)', borderBottom: '2px solid var(--secondary)' }}>
                <Navbar />
            </header>

            <main className="flex flex-1 flex-col">
                <HeroSection />

                <section className="py-16 px-6" style={{ background: 'var(--summer-extra-soft)', borderBottom: '1px solid #E0E0C0' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                                Livres à découvrir
                            </h2>
                            <p className="max-w-2xl mx-auto" style={{ color: 'var(--primary)' }}>
                                Découvrez les coups de cœur de nos lecteurs
                            </p>
                        </div>
                        <BookCarouselHorizontal />
                    </div>
                </section>

                <CategoryGrid />

                <section className="py-16 px-6" style={{ background: 'var(--background-contrast)', borderBottom: '1px solid #E0E0C0' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                                        Écrivains à découvrir
                                    </h2>
                                    <p style={{ color: 'var(--primary)' }}>
                                        Découvrez des auteurs talentueux
                                    </p>
                                </div>
                                <WriterCarouselVertical />
                            </div>

                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                                        Événements à venir
                                    </h2>
                                    <p style={{ color: 'var(--primary)' }}>
                                        Rencontrez vos auteurs préférés
                                    </p>
                                </div>
                                <EventCarouselVertical />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-6" style={{ background: 'var(--summer-extra-soft)', borderBottom: '1px solid #E0E0C0' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                                Recommandés pour vous
                            </h2>
                            <p className="max-w-2xl mx-auto" style={{ color: 'var(--primary)' }}>
                                Des livres sélectionnés spécialement selon vos goûts
                            </p>
                        </div>
                        <RecommendedCarousel />
                    </div>
                </section>

                <section className="py-16 px-6" style={{ background: 'var(--background-contrast)' }}>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                            Prêt à découvrir de nouveaux auteurs ?
                        </h2>
                        <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--primary)' }}>
                            Rejoignez notre communauté de lecteurs et soutenez les auteurs indépendants
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="px-8 py-3 rounded-xl font-semibold shadow-soft transition-soft hover-elevate bg-primary text-primary-foreground text-base"
                                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                            >
                                Commencer à explorer
                            </button>
                            <button
                                className="px-8 py-3 rounded-xl font-semibold shadow-soft transition-soft hover-elevate border border-primary text-primary bg-background text-base"
                                style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'var(--background)' }}
                            >
                                En savoir plus
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
