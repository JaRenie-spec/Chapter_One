'use client'

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { Event } from '@/lib/api'

interface EventCardProps {
    event: Event
}

export default function EventCard({ event }: EventCardProps) {
    const date = new Date(event.dateEvent)
    const formatted = date.toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
    const authorName = event.author?.pseudo || `${event.author?.firstName || ''} ${event.author?.lastName || ''}`.trim() || 'Auteur inconnu'

    return (
        <Link href={`/events/${event.id}`} className="block">
            <Card className="flex flex-col justify-between gap-6 rounded-2xl shadow-soft border-light bg-[#FCF4E5] p-6 hover:shadow-lg hover:-translate-y-1 transition-soft min-h-[340px] h-full">
                {/* Avatar/icône à gauche */}
                <div className="flex items-center gap-6 w-full">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                        <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-summer-soft text-sea px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> {formatted}
                            </span>
                            {event.isOnline && (
                                <Badge variant="secondary" className="text-xs rounded-full accent-summer ml-2">En ligne</Badge>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-1 line-clamp-2">{event.title}</h3>
                        <div className="text-xs text-sea mb-2">par {authorName}</div>
                        {event.location && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                <MapPin className="h-4 w-4 icon-accent" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.maxParticipants && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                <Users className="h-4 w-4 icon-accent" />
                                <span>{event.maxParticipants} participants max</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Description */}
                {event.description && (
                    <div className="bg-[#F3F3E0] rounded-xl border border-[#ECECD9] px-6 py-2 mt-2 text-xs text-sea shadow-soft max-h-24 overflow-y-auto w-full break-words">
                        {event.description}
                    </div>
                )}
                {/* Bouton Détails en bas à gauche */}
                <div className="w-full flex justify-start mt-4">
                    <Badge variant="outline" className="rounded-full accent-summer px-4 py-2 cursor-pointer">Détails →</Badge>
                </div>
            </Card>
        </Link>
    )
}
