"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/app/Navbar/Navbar"
import { Footer } from "@/components/app/Footer/Footer"
import { SearchBar } from "@/components/app/SearchBar/SearchBar"
import { Button } from "@/components/ui/button"
import BookGrid from "@/components/app/BookGrid/BookGrid"
import { bookService, Book } from "@/lib/api"
import { useApi } from "@/lib/hooks/useApi"

export default function SearchPage() {
  const params = useSearchParams()
  // on lit soit `title`, soit `q`, selon ce que tu as choisi
  const raw = params.get("title") ?? params.get("q") ?? ""
  const [searchQuery, setSearchQuery] = useState(raw)

  // on passe maintenant UN OBJET à bookService.search
  const { data: books, loading, error, execute } = useApi<Book[]>(() =>
    searchQuery
      ? bookService.search({ title: searchQuery })
      : bookService.getAll()
  )

  useEffect(() => {
    execute()
  }, [searchQuery])

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery)
    const url = new URL(window.location.href)
    // on met à jour le même paramètre qu'on lit ici
    url.searchParams.set("title", newQuery)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b h-16 flex items-center">
        <Navbar />
      </header>

      <main className="flex flex-1 flex-col pt-16">
        {/* … ton UI de header / SearchBar … */}
        <SearchBar
          placeholder="Rechercher par titre, auteur, genre..."
          onSearch={handleSearch}
          defaultValue={searchQuery}
        />

        {/* … résultats … */}
        {loading && <p>Recherche en cours…</p>}
        {error   && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <BookGrid books={books} loading={loading} error={error} />
        )}
      </main>

      <Footer />
    </div>
  )
}
