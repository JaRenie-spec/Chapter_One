'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
    placeholder?: string
    onSearch?: (query: string) => void
    className?: string
    defaultValue?: string
}

export function SearchBar({ placeholder = "Rechercher des livres, auteurs...", onSearch, className = "", defaultValue = "" }: SearchBarProps) {
    const [query, setQuery] = useState(defaultValue)
    const [isExpanded, setIsExpanded] = useState(false)

    // Mettre à jour la valeur de recherche quand defaultValue change
    useEffect(() => {
        setQuery(defaultValue)
    }, [defaultValue])

    const handleSearch = () => {
        if (query.trim() && onSearch) {
            onSearch(query.trim())
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const clearSearch = () => {
        setQuery('')
        setIsExpanded(false)
    }

    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-[440px] max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sea opacity-70" />
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setIsExpanded(true)}
                        className="pl-14 pr-14 py-2 rounded-full bg-[#F8F8ED] shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-soft h-11"
                    />
                    {query && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-full hover:bg-summer-soft transition-soft"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Button
                    onClick={handleSearch}
                    className="rounded-full px-10 py-2 font-semibold shadow-soft bg-primary text-primary-foreground text-lg transition-soft hover-elevate h-11 min-w-[180px]"
                    disabled={!query.trim()}
                >
                    Rechercher
                </Button>
            </div>

            {/* Suggestions de recherche (optionnel) */}
            {isExpanded && query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#FCF4E5] border border-[#ECECD9] rounded-xl shadow-soft z-50 p-4">
                    <div className="text-base text-sea font-semibold mb-3 text-center">Suggestions :</div>
                    <div className="space-y-2">
                        <button
                            className="w-full text-left px-4 py-2 rounded-xl text-base text-sea hover:bg-summer-soft transition-soft"
                            onClick={() => setQuery('romans')}
                        >
                            Romans
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 rounded-xl text-base text-sea hover:bg-summer-soft transition-soft"
                            onClick={() => setQuery('science-fiction')}
                        >
                            Science-fiction
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 rounded-xl text-base text-sea hover:bg-summer-soft transition-soft"
                            onClick={() => setQuery('fantasy')}
                        >
                            Fantasy
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
