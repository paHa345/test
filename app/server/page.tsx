import { writeFile } from "fs/promises";
import { join } from "path";

export default function ServerUploadPage() {
  async function upload(data: FormData) {
    "use server";
    const file: File | null = data.get("file") as unknown as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("./public", file.name);
    await writeFile(path, buffer);
    return { success: true };
  }
  return (
    <>
      <h1>Server Upload Page</h1>;
      <form action={upload}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}
