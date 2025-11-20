'use client'

import { BookOpen, User } from 'lucide-react'
import Link from 'next/link'

interface AuthorCardProps {
    id: string
    pseudo: string
    bio?: string
    avatar?: string
    booksCount: number
}

export default function AuthorCard({ id, pseudo, bio, avatar, booksCount }: AuthorCardProps) {
    const initials = typeof pseudo === 'string' && pseudo.trim()
        ? pseudo.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
        : '??'

    return (
        <div className="rounded-2xl shadow-soft bg-white p-8 flex flex-col items-center justify-between min-h-[340px]" style={{ boxShadow: '0 4px 24px 0 rgba(24,59,78,0.08), 0 1.5px 6px 0 rgba(39,84,138,0.06)' }}>
            {/* Avatar centré avec ombre douce */}
            <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#F3F3E0] shadow-lg" style={{ boxShadow: '0 0 0 6px #F3F3E0, 0 4px 24px 0 rgba(24,59,78,0.08)' }}>
                    <span className="text-2xl font-semibold text-[#183B4E]">{initials}</span>
                </div>
            </div>
            {/* Nom centré bleu foncé */}
            <div className="text-center mb-4">
                <div className="text-xl font-bold" style={{ color: '#27548A' }}>{pseudo}</div>
            </div>
            {/* Icône livre + nombre */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="h-5 w-5" style={{ color: '#DDA853' }} />
                <span className="text-base font-semibold text-[#183B4E]">{booksCount}</span>
                <span className="text-base text-muted-foreground">livres</span>
            </div>
            {/* Bouton Profil large centré arrondi bleu foncé */}
            <Link href={`/author/${id}`} className="w-full flex justify-center mt-auto">
                <button
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#27548A] text-white font-semibold py-3 text-base shadow transition-soft hover:bg-[#183B4E] focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ minWidth: 0 }}
                >
                    <User className="h-5 w-5" />
                    Profil
                </button>
            </Link>
        </div>
    )
}
