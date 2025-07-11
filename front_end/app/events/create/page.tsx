'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/lib/hooks/useApi';
import { eventService, Event } from '@/lib/api';
import { Navbar } from '@/components/app/Navbar/Navbar';
import { Footer } from '@/components/app/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CreateEventPage() {
    const router = useRouter();
    const { execute: createEvent, loading, error } = useApi<Event>(eventService.create);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEvent, setDateEvent] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createEvent({ title, description, dateEvent });
        router.push('/events');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50 bg-primary border-b-2 border-[#ECECD9] h-16 flex items-center px-8 shadow-soft">
                <Navbar />
            </header>

            <main className="pt-16 flex-1 px-6">
                <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background p-6 rounded-lg shadow min-h-[calc(100vh-128px)]">
                    <div className="max-w-xl mx-auto bg-[#FCF4E5] p-8 rounded-xl shadow-soft border border-[#ECECD9] space-y-6">
                        <h1 className="text-2xl font-bold text-center">Créer un événement</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Titre</Label>
                                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft" />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft" />
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
                                <Button variant="outline" onClick={() => router.back()} type="button" className="rounded-xl font-semibold text-base shadow-soft transition-soft hover-elevate">Annuler</Button>
                                <Button type="submit" disabled={loading} className="rounded-xl font-semibold text-base shadow-soft transition-soft hover-elevate">{loading ? 'Création…' : 'Créer'}</Button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
