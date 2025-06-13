import { DropdownMenu } from "radix-ui";
import { useState, type ChangeEvent, type FormEvent } from "react";
import PostCaption from "../Components/PostCaption";

function GeneratorPage() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [vibe, setVibe] = useState<string>("");

  async function generateCaption(image: File, vibe: string) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("vibe", vibe);

    const response = await fetch("http://localhost:5000/caption", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to generate caption");
    }

    const data = await response.json();
    return data.caption;
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleVibeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setVibe(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image || !vibe) return;

    setLoading(true);
    setCaption("");
    try {
      const generatedCaption = await generateCaption(image, vibe);
      setCaption(generatedCaption);
    } catch (error) {
      setCaption("Error generating caption");
    }
    setLoading(false);
  };

  return (
    <div className="generator-page flex flex-col items-center min-h-screen bg-black p-10">
      <div className="font-[Lobster] mt-5 text-white flex flex-col items-center">
        <h1 className="text-7xl">Caption Generator</h1>
        <p className="text-lg">By Nick Yuan</p>
      </div>

      <form
        className="flex flex-col items-center mt-20"
        onSubmit={handleSubmit}
      >
        <div className="mt-10 flex flex-col bg-gray-600 rounded p-10">
          <label className="text-white text-2xl mb-4" htmlFor="image-input">
            Upload a picture to generate a caption
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            className="text-white bg-blue-400 rounded w-full p-2 center hover:bg-blue-500"
            required
            onChange={handleImageChange}
          />

          <input
            id="vibe-input"
            type="text"
            value={vibe}
            onChange={handleVibeChange}
            className="bg-white mt-4 rounded placeholder:p-1 p-1"
            placeholder="What should the caption's vibe be?"
          />

          <div className="flex flex-row justify-center mt-6">
            <button className="bg-blue-400 rounded p-2 text-white w-32 hover:bg-blue-500">
              {loading ? "Generating..." : "Generate Caption"}
            </button>
          </div>
        </div>
      </form>
      <PostCaption img={image} caption={caption} />
    </div>
  );
}

export default GeneratorPage;
