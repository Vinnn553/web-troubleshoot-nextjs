'use client'
import { useState } from 'react';
import { searchItem } from './Search';

export default function Header({onSearchResults}) {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        
        // Panggil Server Action saat user mengetik
        try {
            const results = await searchItem(value);
            if (onSearchResults) {
                onSearchResults(results); // Mengirim hasil pencarian ke parent component (jika ada)
            }
        } catch (err) {
            console.error(err);
        }
    };
        return (
            <header className="header fixed top-0 left-0 z-100 w-full py-3 px-6 bg-[#8dccff]">
                <nav className="nav flex w-full justify-between items-center">
                    <div className="logo">
                        <a href="#" className="nav-logo font-bold text-lg">Dekoruma.com</a>
                    </div>
                    <div className="button flex items-center gap-2">
                        <div className="searchBar">
                            <input type="text" placeholder="search" value={query} onChange={handleSearch} className="searchBar pl-2 px-1 py-1 bg-white rounded-full border" />
                        </div>
                    </div>
                </nav>
            </header>
        )
    }