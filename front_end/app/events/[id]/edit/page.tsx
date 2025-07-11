'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useApi } from '@/lib/hooks/useApi'
import { eventService, Event } from '@/lib/api'
import { Navbar } from '@/components/app/Navbar/Navbar'
import { Footer } from '@/components/app/Footer/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function EditEventPage() {
    const { id: rawId } = useParams() as { id?: string }
    if (!rawId) return <p className="text-center py-12 text-red-500">ID manquant</p>
    const id = rawId

    const router = useRouter()

    // Récupère l'événement existant
    const {
        data: event,
        loading: fetching,
        error: fetchError,
        execute: fetchEvent
    } = useApi<Event>(eventService.getById)

    // Envoie la mise à jour
    const {
        execute: updateEvent,
        loading: saving,
        error: saveError
    } = useApi<Event>((eventId: string, payload: Partial<Event>) =>
        eventService.update(eventId, payload)
    )

    // États du formulaire
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateEvent, setDateEvent] = useState('')

    // Charge l'événement au montage
    useEffect(() => {
        fetchEvent(id)
    }, [id, fetchEvent])

    // Initialise les champs quand l'event est chargé
    useEffect(() => {
        if (event) {
            setTitle(event.title)
            setDescription(event.description)
            // slice to 'YYYY-MM-DDTHH:mm' for datetime-local
            setDateEvent(event.dateEvent.slice(0, 16))
        }
    }, [event])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Préparer date au format ISO complet
        const isoDate = new Date(dateEvent).toISOString()

        // Appel API
        await updateEvent(id, { title, description, dateEvent: isoDate })

        // Redirige uniquement si pas d'erreur de validation
        if (!saveError) {
            router.push(`/events/${id}`)
        }
    }

    if (fetching) return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-[#ECECD9] h-16 flex items-center px-8 shadow-soft">
                <Navbar />
            </header>
            <main className="pt-16 flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </main>
            <Footer />
        </div>
    )

    if (fetchError) return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-[#ECECD9] h-16 flex items-center px-8 shadow-soft">
                <Navbar />
            </header>
            <main className="pt-16 flex-1 flex items-center justify-center">
                <p className="text-red-500">Erreur de chargement : {fetchError}</p>
            </main>
            <Footer />
        </div>
    )

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-[#ECECD9] h-16 flex items-center px-8 shadow-soft">
                <Navbar />
            </header>

            <main className="pt-16 flex-1">
                <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12 rounded-lg shadow min-h-[calc(100vh-128px)]">
                    <div className="w-full max-w-3xl mx-auto bg-[#FCF4E5] p-12 rounded-2xl shadow-soft border border-[#ECECD9] space-y-8">
                        <h1 className="text-3xl font-bold text-center">Modifier l'événement</h1>
                        {saveError && <p className="text-red-500">{saveError}</p>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    className="min-h-32 rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft resize-none"
                                    placeholder="Décrivez votre événement en détail..."
                                />
                            </div>

                            <div>
                                <Label htmlFor="dateEvent">Date &amp; heure</Label>
                                <Input
                                    id="dateEvent"
                                    type="datetime-local"
                                    value={dateEvent}
                                    onChange={e => setDateEvent(e.target.value)}
                                    required
                                    className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft"
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => router.back()}
                                    type="button"
                                    className="rounded-xl font-semibold text-base shadow-soft transition-soft hover-elevate"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-xl font-semibold text-base shadow-soft transition-soft hover-elevate"
                                >
                                    {saving ? 'Enregistrement…' : 'Enregistrer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
