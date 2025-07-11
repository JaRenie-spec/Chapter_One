'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { bookService } from '@/lib/api'
import { useAuth } from '@/lib/hooks/useAuth'    // ← importer useAuth

export default function CreateBookForm() {
    const router = useRouter()
    const { user } = useAuth()                   // ← récupérer user
    const [title, setTitle] = useState('')
    const [isbn, setIsbn] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // On ajoute authorId depuis keycloakUser.sub
        const payload: Record<string, any> = {
            title,
            isbn,
            price: parseFloat(price),
            description,
            fileUrl,
            coverImage,
            authorId: user?.sub,      // ← MUST: fournir authorId
        }

        const response = await bookService.create(payload)
        setLoading(false)

        if (response.success) {
            router.push('/books')
        } else {
            setError(response.error || 'Erreur lors de la création du livre')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 space-y-6 bg-[#FCF4E5] rounded-xl shadow-soft border border-[#ECECD9]">
            {error && <p className="text-red-500">{error}</p>}

            <div>
                <Label htmlFor="title">Titre</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft" />
            </div>

            <div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" value={isbn} onChange={e => setIsbn(e.target.value)} required className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft" />
            </div>

            <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft"
                />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft" />
            </div>

            <div>
                <Label htmlFor="fileUrl">URL du livre</Label>
                <Input
                    id="fileUrl"
                    type="url"
                    value={fileUrl}
                    onChange={e => setFileUrl(e.target.value)}
                    required
                    className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft"
                />
            </div>

            <div>
                <Label htmlFor="coverImage">URL de la couverture</Label>
                <Input
                    id="coverImage"
                    type="url"
                    value={coverImage}
                    onChange={e => setCoverImage(e.target.value)}
                    className="rounded-xl shadow-soft border border-[#D9D9C8] focus:border-primary focus:ring-2 focus:ring-primary/20 text-base transition-soft"
                />
            </div>


            <Button type="submit" disabled={loading} className="w-full rounded-xl font-semibold text-base shadow-soft transition-soft hover-elevate">
                {loading ? 'Publication...' : 'Publier le livre'}
            </Button>
        </form>
    )
}
