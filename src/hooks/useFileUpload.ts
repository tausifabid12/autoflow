"use client";
import { useState } from "react";

const API_BASE = "https://file.pinggo.online"; 

interface DeleteFile {
  folder: string;
  filename: string;
}

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === Upload a single file ===
  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      return data.url as string;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // === Delete a single file ===
  const deleteFile = async (folder: string, filename: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/file/${folder}/${filename}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // === Delete multiple files ===
  const deleteMultiple = async (files: DeleteFile[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/delete-multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files }),
      });

      if (!res.ok) throw new Error("Delete multiple failed");

      return await res.json(); // { results: [...] }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadFile,
    deleteFile,
    deleteMultiple,
    loading,
    error,
  };
}
