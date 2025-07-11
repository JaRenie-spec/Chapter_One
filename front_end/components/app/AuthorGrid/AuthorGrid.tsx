'use client'

import { useEffect } from 'react'
import { useApi } from '@/lib/hooks/useApi'
import { authorService, Author } from '@/lib/api'
import AuthorCard from '@/components/app/AuthorCard/AuthorCard'

export default function AuthorGrid() {
    const { data: authors, loading, error, execute } = useApi<Author[]>(authorService.getAll);

    useEffect(() => {
        execute();
    }, [execute]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-[#FCF4E5] rounded-2xl p-6 min-h-[340px]">
                            <div className="flex items-center gap-6 mb-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Erreur lors du chargement des auteurs : {error}</p>
            </div>
        );
    }

    if (!authors || authors.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun auteur trouvé.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
                <AuthorCard
                    key={author.id}
                    id={author.id}
                    pseudo={author.pseudo}
                    bio={author.bio}
                    avatar={author.link}
                    booksCount={author.books?.length || 0}
                />
            ))}
        </div>
    );
}
