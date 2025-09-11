"use client";
import { useEffect, useState } from "react";

type ImageData = {
  id: number;
  fileName: string;
  imageName: string;
  imageUrl: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("/api/images", {
        headers: { "x-api-key": "YOUR_TEST_KEY" }, // replace with your key
      });
      const data = await res.json();
      setImages(data.images || []);
    }
    fetchImages();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gallery (from Site A)</h1>
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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
