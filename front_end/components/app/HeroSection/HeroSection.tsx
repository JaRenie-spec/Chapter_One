'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import { SearchBar } from '@/components/app/SearchBar/SearchBar'
import Image from "next/image"
import Link from 'next/link'

export default function HeroSection() {
    const handleSearch = (query: string) => {
        // Rediriger vers la page de recherche avec la requête
        window.location.href = `/search?q=${encodeURIComponent(query)}`
    }

    return (
        <section className="relative px-6 py-20" style={{ background: '#F3F3E0' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenu principal */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full accent-summer text-sm font-medium mb-6">
                            <Star className="h-4 w-4 mr-2 icon-accent" />
                            Découvrez des auteurs talentueux
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight title-navy">
                            Soutenez les
                            <span className="title-navy"> auteurs indépendants</span>
                        </h1>
                        <p className="text-lg text-sea mb-8 max-w-2xl">
                            Explorez une collection unique de livres écrits par des auteurs passionnés.
                            Achetez directement auprès des créateurs et découvrez des histoires authentiques.
                        </p>
                        {/* Barre de recherche */}
                        <div className="mb-8">
                            <SearchBar
                                placeholder="Rechercher des livres, auteurs, genres..."
                                onSearch={handleSearch}
                                className="max-w-md mx-auto lg:mx-0"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="btn-primary text-base px-6 py-3">
                                Explorer les livres
                                <ArrowRight className="ml-2 h-4 w-4 icon-accent" />
                            </Button>
                            <Button variant="outline" size="lg" className="text-base px-6 py-3">
                                Découvrir les auteurs
                            </Button>
                        </div>
                        {/* Statistiques */}
                        <div className="flex justify-center lg:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-2xl font-bold title-navy">500+</div>
                                <div className="text-sm text-sea">Auteurs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold title-navy">2000+</div>
                                <div className="text-sm text-sea">Livres</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold title-navy">10k+</div>
                                <div className="text-sm text-sea">Lecteurs</div>
                            </div>
                        </div>
                    </div>

                    {/* Image/Illustration */}
                    <div className="relative ml-8">
                        <div className="bg-gradient-to-br from-[#27548A]/20 to-[#DDA853]/20 rounded-2xl p-6 h-80
                         flex items-center justify-center">
                            <div className="text-center">
                                <Image
                                    src="/Chapter_one.png" // Chemin depuis public
                                    alt="Couverture de livre"
                                    width={800}
                                    height={800}
                                    className="mx-auto rounded-xl"
                                />
                            </div>
                        </div>
                        {/* Éléments décoratifs */}
                        <div className="absolute -top-3 -right-3 w-16 h-16 accent-summer rounded-full opacity-30"></div>
                        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#27548A]/20 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
