'use client';

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from 'axios';

export default function SearchBook({ setResults }) {
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [noSearch, setNoSearch] = useState(false);
    const [noSearchBy, setNoSearchBy] = useState(false);

    useEffect(() => {
        let timer;
        if (noSearch || noSearchBy) {
            timer = setTimeout(() => {
                setNoSearch(false);
                setNoSearchBy(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [noSearch, noSearchBy]);

    const handleSearch = async (event) => {
        event.preventDefault();

        if (!search) {
            setNoSearch(true);
            return;
        }

        if (!searchBy) {
            setNoSearchBy(true);
            return;
        }

        const searchParams = { search, searchBy };
        try {
            const response = await axios.get('/api/search', { params: searchParams });
            setResults(Array.isArray(response.data) ? response.data : [response.data]);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md mt-4">
                <h1 className="text-gray-700 text-2xl font-bold mb-4">Search for a Book</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Search By</label>
                    <Select value={searchBy} onValueChange={(value) => setSearchBy(value)}>
                        <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500">
                            <SelectValue placeholder="Select a Search Criterion" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Search By</SelectLabel>
                                <SelectItem value="title">Title</SelectItem>
                                <SelectItem value="author">Author</SelectItem>
                                <SelectItem value="_id">ID</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                                <SelectItem value="genre">Genre</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Search</label>
                    <input
                        type='text'
                        placeholder={`Enter ${searchBy}`}
                        value={search}
                        onChange={(ev) => setSearch(ev.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                    />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Search
                </Button>
            </form>
            {noSearch && !noSearchBy && <p className="text-red-500 text-sm text-center pt-2">Please enter a search term</p>}
            {noSearchBy && !noSearch && <p className="text-red-500 text-sm text-center pt-2">Please enter a by term</p>}
            {noSearch && noSearchBy && <p className="text-red-500 text-sm text-center pt-2">Please enter a search term and a search by term</p>}
        </div>
    );
}
