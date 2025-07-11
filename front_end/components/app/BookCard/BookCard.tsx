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
            className="bg-card-modern rounded-xl shadow-soft border-light p-md hover-elevate transition-soft cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            tabIndex={0}
            role="button"
            onClick={onClickCard}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClickCard?.() }}
        >
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full rounded-xl"
                    />
                ) : (
                    <div className={`bg-gradient-to-br ${coverColor} flex items-center justify-center w-full h-full rounded-xl`}>
                        <BookOpen className="h-16 w-16 icon-accent" />
                    </div>
                )}
            </div>
            <div className="p-0">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 title-navy">{title}</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="icon-accent"
                        onClick={e => { e.stopPropagation(); onFavorite?.() }}
                    >
                        <Heart className="h-4 w-4" style={{ color: '#27548A' }} />
                    </Button>
                </div>
                <p className="text-sm text-sea mb-3">{author}</p>
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'icon-accent fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-sea ml-1">({rating.toFixed(1)})</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg title-navy">€{price.toFixed(2)}</span>
                    <Button size="sm" className="btn-primary" onClick={e => { e.stopPropagation(); onAddToCart?.() }}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ajouter
                    </Button>
                </div>
            </div>
        </div>
    )
}
