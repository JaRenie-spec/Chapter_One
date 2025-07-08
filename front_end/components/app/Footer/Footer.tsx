import Link from 'next/link'
import { BookOpen, Mail, Twitter, Instagram, Facebook } from 'lucide-react'

export function Footer() {
    return (
        <footer style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo et description */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4" style={{ color: 'var(--primary-foreground)' }}>
                            <BookOpen className="h-8 w-8" style={{ color: 'var(--primary-foreground)' }} />
                            <span className="text-xl font-bold">Chapter One</span>
                        </Link>
                        <p className="mb-4 max-w-md" style={{ color: 'var(--primary-foreground)' }}>
                            Soutenons ensemble les auteurs indépendants. Découvrez des histoires uniques
                            et achetez directement auprès des créateurs.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" style={{ color: 'var(--primary-foreground)' }}>
                                <Twitter className="h-5 w-5" style={{ color: 'var(--primary-foreground)' }} />
                            </Link>
                            <Link href="#" style={{ color: 'var(--primary-foreground)' }}>
                                <Instagram className="h-5 w-5" style={{ color: 'var(--primary-foreground)' }} />
                            </Link>
                            <Link href="#" style={{ color: 'var(--primary-foreground)' }}>
                                <Facebook className="h-5 w-5" style={{ color: 'var(--primary-foreground)' }} />
                            </Link>
                            <Link href="#" style={{ color: 'var(--primary-foreground)' }}>
                                <Mail className="h-5 w-5" style={{ color: 'var(--primary-foreground)' }} />
                            </Link>
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--primary-foreground)' }}>Découvrir</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/books" style={{ color: 'var(--primary-foreground)' }}>
                                    Tous les livres
                                </Link>
                            </li>
                            <li>
                                <Link href="/writers" style={{ color: 'var(--primary-foreground)' }}>
                                    Auteurs
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" style={{ color: 'var(--primary-foreground)' }}>
                                    Événements
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" style={{ color: 'var(--primary-foreground)' }}>
                                    Catégories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--primary-foreground)' }}>Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" style={{ color: 'var(--primary-foreground)' }}>
                                    Centre d'aide
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" style={{ color: 'var(--primary-foreground)' }}>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" style={{ color: 'var(--primary-foreground)' }}>
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" style={{ color: 'var(--primary-foreground)' }}>
                                    Conditions d'utilisation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-8 pt-8 text-center" style={{ color: 'var(--primary-foreground)' }}>
                    <p>&copy; 2024 IndieBooks. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
