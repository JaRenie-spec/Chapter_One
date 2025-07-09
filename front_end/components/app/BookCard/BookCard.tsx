'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Star, Heart, ShoppingCart, BookOpen } from 'lucide-react'

interface BookCardProps {
    title: string
    author: string
    rating: number
    price: number
    coverColor?: string
    coverImage?: string
    onAddToCart?: () => void
    onFavorite?: () => void
    onClickCard?: () => void
}

export default function BookCard({
    title,
    author,
    rating,
    price,
    coverColor = "from-blue-100 to-purple-100",
    coverImage,
    onAddToCart,
    onFavorite,
    onClickCard
}: BookCardProps) {
    return (
        <div
            className="bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            tabIndex={0}
            role="button"
            onClick={onClickCard}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClickCard?.() }}
        >
            <div className={`aspect-[3/4] rounded-t-lg overflow-hidden`}>
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className={`bg-gradient-to-br ${coverColor} flex items-center justify-center w-full h-full`}>
                        <BookOpen className="h-16 w-16 text-primary/60" />
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={e => { e.stopPropagation(); onFavorite?.() }}
                    >
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{author}</p>
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({rating.toFixed(1)})</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">€{price.toFixed(2)}</span>
                    <Button size="sm" onClick={e => { e.stopPropagation(); onAddToCart?.() }}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ajouter
                    </Button>
                </div>
            </div>
        </div>
    )
}
