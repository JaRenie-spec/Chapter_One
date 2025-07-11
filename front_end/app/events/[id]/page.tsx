'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/app/Navbar/Navbar'
import { Footer } from '@/components/app/Footer/Footer'
import { useApi } from '@/lib/hooks/useApi'
import { eventService, Event } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users as UsersIcon } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

// Palette
const COLORS = {
    beige: '#F3F3E0',
    navy: '#27548A',
    sea: '#183B4E',
    summer: '#DDA853',
}

export default function EventDetailPage() {
    const { id: rawId } = useParams() as { id?: string }
    if (!rawId) return <p className="text-center py-12 text-red-500">ID manquant</p>
    const id = rawId

    const router = useRouter()
    const { data: event, loading, error, execute } = useApi<Event>(eventService.getById)
    const { execute: deleteEvent } = useApi<void>(eventService.delete)
    const { user: kcUser, isAuthenticated } = useAuth()

    useEffect(() => { execute(id) }, [id, execute])

    if (loading) return (
        <div className="flex items-center justify-center h-screen" style={{ background: COLORS.beige }}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COLORS.navy }} />
        </div>
    )
    if (error) return <p className="text-center py-12 text-red-500">Erreur : {error}</p>
    if (!event) return <p className="text-center py-12">Événement introuvable.</p>

    const date = new Date(event.dateEvent)
    const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

    const handleDelete = async () => {
        if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
            await deleteEvent(id)
            router.push('/events')
        }
    }

    return (
        <div className="flex flex-col min-h-screen" style={{ background: COLORS.beige }}>
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-[#ECECD9] h-16 flex items-center px-8 shadow-soft">
                <Navbar />
            </header>
            <main className="flex-1 flex flex-col pt-16 px-4 py-12" style={{ background: COLORS.beige }}>
                <div className="max-w-2xl mx-auto">
                    {/* Retour */}
                    <Button
                        variant="link"
                        className="mb-4 font-semibold"
                        style={{ color: COLORS.summer }}
                        onClick={() => router.push('/events')}
                    >
                        ← Retour à la liste des événements
                    </Button>

                    {/* Carte principale */}
                    <div className="rounded-xl shadow-lg p-8 space-y-8" style={{ background: '#fff', border: `1px solid ${COLORS.beige}` }}>
                        {/* Titre & Date */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h1 className="text-3xl font-bold mb-2 md:mb-0" style={{ color: COLORS.navy }}>{event.title}</h1>
                            <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.sea }}>
                                <Calendar className="h-5 w-5" style={{ color: COLORS.sea }} />
                                <span>{formattedDate} à {formattedTime}</span>
                            </div>
                        </div>

                        {/* Détails */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <h2 className="text-xl font-semibold" style={{ color: COLORS.navy }}>Description</h2>
                                <p className="leading-relaxed" style={{ color: COLORS.sea }}>{event.description}</p>
                            </div>
                            <div className="w-full md:w-64 flex-shrink-0 space-y-4">
                                <div className="rounded-lg p-4 space-y-2 border" style={{ background: COLORS.beige, borderColor: COLORS.navy }}>
                                    <h3 className="font-medium mb-2" style={{ color: COLORS.sea }}>Détails</h3>
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.sea }}>
                                            <MapPin className="h-4 w-4" style={{ color: COLORS.sea }} />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.sea }}>
                                        <UsersIcon className="h-4 w-4" style={{ color: COLORS.sea }} />
                                        <span>
                                            {event.maxParticipants != null
                                                ? `${event.maxParticipants} places`
                                                : 'Nombre de places non précisé'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-2 pt-4 border-t" style={{ borderColor: COLORS.beige }}>
                            {(isAuthenticated && (kcUser?.sub === event.author?.id || kcUser?.realm_access?.roles.includes('admin'))) && (
                                <>
                                    <Button
                                        variant="secondary"
                                        className="w-full md:w-auto font-semibold"
                                        style={{ background: COLORS.navy, color: '#fff', border: 'none' }}
                                        onClick={() => router.push(`/events/${id}/edit`)}
                                    >
                                        Modifier
                                    </Button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-xl font-semibold shadow-soft border border-[#DDA853] bg-[#DDA853] text-[#183B4E] hover:bg-summer-soft hover:text-sea transition-soft text-sm w-full md:w-auto"
                                        onClick={handleDelete}
                                    >
                                        Supprimer
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
