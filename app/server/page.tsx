"use client";
import { writeFile } from "fs/promises";
import { join } from "path";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ServerUploadPage() {
  const [file, setFile] = useState<File>();
  // async function upload(data: FormData) {
  //   "use server";
  //   const file: File | null = data.get("file") as unknown as File;

  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);
  //   const path = join("./public", file.name);
  //   await writeFile(path, buffer);
  //   console.log(path);
  //   return { success: true };
  // }
  const dispatch = useDispatch();

  const uoloadImageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      console.log(await res.json());

      if (!res.ok) throw new Error(await res.text());
    } catch (error) {}
  };
  return (
    <>
      <h1>Server Upload Page</h1>
      <form onSubmit={uoloadImageHandler}>
        <input onChange={(e) => setFile(e.target.files?.[0])} type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}
