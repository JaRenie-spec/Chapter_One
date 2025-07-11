'use client'

import * as React from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Search,
    ShoppingCart,
    User as UserIcon,
    LogOut,
    Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/hooks/useAuth'
import { useCart } from '@/lib/hooks/useCart'
import { useRouter } from 'next/navigation'

export function Navbar() {
    const {
        user: kcUser,
        isAuthenticated,
        isLoading: authLoading,
        login,
        logout,
    } = useAuth()
    const { cart, removeFromCart, updateQuantity } = useCart()
    const cartCount = cart.reduce((sum, item) => sum + (typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0), 0)
    const router = useRouter()

    return (
        <nav className="flex items-center justify-between w-full px-6 py-2" style={{ background: 'var(--primary)' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 navbar-link">
                <BookOpen className="h-7 w-7" style={{ color: 'inherit', transition: 'color 0.2s' }} />
                <span className="text-lg font-bold">Chapter One</span>
            </Link>

            {/* Liens de navigation */}
            <div className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium navbar-link">Accueil</Link>
                <Link href="/books" className="text-sm font-medium navbar-link">Livres</Link>
                <Link href="/writers" className="text-sm font-medium navbar-link">Écrivains</Link>
                <Link href="/events" className="text-sm font-medium navbar-link">Événements</Link>
                {isAuthenticated && (
                    <>
                        <Link href="/books/create" className="text-sm font-medium navbar-link">
                            Publier un livre
                        </Link>
                        <Link href="/events/create" className="text-sm font-medium navbar-link">
                            Créer un évènement
                        </Link>
                    </>
                )}
            </div>

            {/* Actions utilisateur + Panier */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="navbar-link p-0" style={{ minWidth: 36 }}>
                    <Search className="h-5 w-5" style={{ color: 'inherit', transition: 'color 0.2s' }} />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative navbar-link p-0 rounded-xl px-4 py-2 transition-soft" style={{ minWidth: 36 }}>
                            <ShoppingCart className="h-6 w-6" style={{ color: 'inherit', transition: 'color 0.2s' }} />
                            <span className={`absolute -top-1 -right-1 bg-summer text-navy rounded-full text-xs px-1.5 py-0.5 transition-all ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-soft border border-[#ECECD9] bg-white p-4 data-[state=open]:bg-[#F3F3E0]">
                        <div>
                            <h4 className="font-semibold mb-2">Mon panier</h4>
                            {cart.length === 0 ? (
                                <div className="text-muted-foreground text-sm">Votre panier est vide.</div>
                            ) : (
                                <ul className="divide-y divide-muted-foreground/10 max-h-64 overflow-y-auto">
                                    {cart.map(item => (
                                        <li key={item.id} className="flex items-center gap-2 py-3">
                                            <div className="flex-1">
                                                <div className="font-medium line-clamp-1">{item.title}</div>
                                                <div className="text-xs text-muted-foreground">€{item.price.toFixed(2)}</div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full shadow-soft hover-elevate transition-soft" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                                                <span className="px-2 text-base font-semibold">{item.quantity}</span>
                                                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full shadow-soft hover-elevate transition-soft" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                            </div>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-red-500 hover:bg-red-100 transition-soft" onClick={() => removeFromCart(item.id)}>
                                                ×
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {cart.length > 0 && (
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="font-semibold">Total :</span>
                                    <span className="font-bold">€{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="mt-4 flex gap-2">
                                <Button className="w-full rounded-xl shadow-soft transition-soft hover-elevate text-base font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} disabled={cart.length === 0}>
                                    Commander
                                </Button>
                            </div>
                            <div className="mt-2 text-center">
                                <Link href="/cart" className="text-primary underline text-sm">Voir mon panier</Link>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {authLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                ) : isAuthenticated && kcUser ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center navbar-link">
                                <Avatar className="h-6 w-6">
                                    {/* Pas de propriété avatar sur KeycloakUser,
                      on passe une source vide pour forcer le fallback */}
                                    <AvatarImage src="" alt={kcUser.preferred_username} />
                                    <AvatarFallback>
                                        {kcUser.given_name?.[0] || kcUser.preferred_username[0]?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">
                                    {kcUser.given_name || kcUser.preferred_username}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-soft border border-[#F3F3E0] bg-[#FCF4E5] p-4">
                            <div>
                                <p className="text-sm font-medium">
                                    {kcUser.given_name} {kcUser.family_name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {kcUser.email}
                                </p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    if (kcUser?.realm_access?.roles.includes('author')) {
                                        router.push(`/author/${kcUser.sub}`)
                                    } else {
                                        router.push('/user')
                                    }
                                }}
                                className="flex items-center cursor-pointer rounded-full font-semibold text-base border border-primary text-primary bg-transparent mb-2 transition-soft hover:bg-summer hover:text-sea"
                                style={{ gap: '0.75rem' }}
                            >
                                <UserIcon className="h-5 w-5" style={{ color: 'var(--sea)' }} />
                                Mon Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="	http://localhost:8080/realms/ebook-store/account/" className="flex items-center rounded-full font-semibold text-base border border-primary text-primary bg-transparent mb-2 transition-soft hover:bg-summer hover:text-sea" style={{ gap: '0.75rem' }}>
                                    <Settings className="h-5 w-5" style={{ color: 'var(--sea)' }} />
                                    Paramètres du compte
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className="flex items-center rounded-full font-semibold text-base border border-primary text-primary bg-transparent transition-soft hover:bg-summer hover:text-sea" style={{ gap: '0.75rem' }}>
                                <LogOut className="h-5 w-5" style={{ color: 'var(--sea)' }} />
                                Déconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center navbar-link p-0"
                        style={{ minWidth: 36 }}
                        onClick={() => {
                            const url = typeof window !== 'undefined'
                                ? window.location.pathname + window.location.search + window.location.hash
                                : '/';
                            login(url);
                        }}
                    >
                        <UserIcon className="h-4 w-4 mr-2" style={{ color: 'inherit', transition: 'color 0.2s' }} />
                        Connexion
                    </Button>
                )}
            </div>
        </nav>
    )
}
