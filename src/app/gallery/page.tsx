"use client";
import { useEffect, useState } from "react";

type ImageData = {
  id: number;
  fileName: string;
  imageName: string;
  imageUrl: string;
  email: string;
  name: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState(""); // 🔍 for filtering

  async function fetchImages(nameFilter?: string) {
    const query = nameFilter ? `?name=${encodeURIComponent(nameFilter)}` : "";
    const res = await fetch(`/api/images${query}`, {
      headers: { "x-api-key": "YOUR_TEST_KEY" }, // replace with your key
    });
    const data = await res.json();
    setImages(data.images || []);
  }

  useEffect(() => {
    fetchImages(); // load all by default
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gallery (from Site A)</h1>

      {/* 🔍 Search Controls */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by uploader name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={() => fetchImages(search)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearch("");
            fetchImages(); // reset
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* 📸 Image Grid */}
      <div className="grid grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="rounded-lg shadow bg-white">
            <img
              src={img.imageUrl}
              alt={img.imageName}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-2 text-center">
              <p className="font-semibold">{img.imageName || img.fileName}</p>
              <p className="text-sm text-gray-600">By: {img.name}</p>
              <p className="text-xs text-gray-400">{img.email}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
